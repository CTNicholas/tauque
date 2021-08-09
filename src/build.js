import path from 'path'
import { performance } from 'perf_hooks'
import esbuild from 'esbuild'
import state from './state.js'
import message from './message.js'
import watch from './watch.js'

/**
 * Builds all bundles, and returns a promise that resolves after all
 * bundles are built
 * Promise returns any warnings that have been returned from esbuild
 * @returns {Promise<Object>} - Warnings returned from esbuild
 */
export default async function () {
  if (state.waiting === true) {
    return null
  }

  message.building()
  state.resetBuild()
  const buildStart = performance.now()
  const bundles = buildBundles()
  try {
    return Promise.all(bundles).then(warnings => {
      state.buildTime = performance.now() - buildStart
      state.buildCount++
      message.built()
      message.warnings(warnings)
      return warnings
    })
  } catch (err) {
    message.error(err)
  }
}

/**
 * Beings bundling bundles, using settings from state.config.
 * Returns a Promise array of all the running builds
 * @returns {Array<Promise<Object>>} - Array of build promises
 */
function buildBundles () {
  return state.config.reduce((res, conf) => {
    const formats = {
      node: 'cjs',
      browser: 'iife',
      module: 'esm'
    }

    try {
      if (conf.type === 'all') {
        const bundles = Object.entries(formats).map(([key, val]) => {
          return buildSingle(conf, key, val)
        })
        return [...res, ...bundles]
      }

      return [...res, buildSingle(conf)]
    } catch (err) {
      message.error(err)
    }
  }, [])
}

/**
 * Builds a single file, returns a promise containing any warnings
 * Settings are set in the JSON config file
 * Anything passed to conf.esbuild will override any other settings
 * @param conf - The configuration object
 * @param pkgType - The package type, to be added to the file name, ie .umd: package.umd.js
 * @param formatType - The format type, to be added to the file name, ie .umd: package.umd.js
 * @returns {Promise<Object>}
 */
function buildSingle (conf, pkgType = '', formatType = '') {
  const fileExt = conf.source && conf.source.endsWith('.css') ? 'css' : 'js'
  const outfile = path.join(conf.outputDir, `${conf.name}${pkgType ? '.' + pkgType : ''}.${fileExt}`)

  const cachedFile = state.getCache(outfile)
  if (cachedFile !== null) {
    return cachedFile.rebuild().then(result => {
      state.addFile(outfile, result)
      return result
    })
  }

  let platform = pkgType || conf.type
  let format = formatType || undefined
  if (pkgType === 'module' || conf.type === 'module') {
    platform = 'browser'
    format = 'esm'
  }

  let define = {}
  if (conf.useEnvVariables) {
    define = getEnvVariables()
  }

  return esbuild.build({
    entryPoints: [conf.source],
    outfile: outfile,
    bundle: conf.bundle,
    platform: platform,
    format: format,
    globalName: conf.global.length ? conf.global : undefined,
    minify: conf.minify,
    sourcemap: conf.sourceMap,
    target: conf.target.length ? conf.target : undefined,
    //logLevel: 'error',
    logLevel: 'error',
    incremental: true,
    define: define,
    ...conf.esbuild
  })
    .catch(err => {
      message.error(err)
    })
    .then(result => {
    state.addFile(outfile, result)
    return result
  })
}

function getEnvVariables () {
  const define = {}
  for (const envVar in process.env) {
    if (envVar.includes('(') || envVar.includes(')')) {
      continue
    }
    define[`process.env.${envVar}`] = JSON.stringify(process.env[envVar])
  }
  return define
}

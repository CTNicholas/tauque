import path from 'path'
import esbuild from 'esbuild'
import state from '../state/index.js'
import message from '../message/index.js'
import getBundleFormat from './getBundleFormat.js'
import getEnvVariables from './getEnvVariables.js'

/**
 * Builds a single file, returns a promise containing any warnings
 * Settings are set in the JSON config file
 * Anything passed to conf.esbuild will override any other settings
 * @param conf - The configuration object
 * @param pkgType - The package type, to be added to the file name, ie .umd: package.umd.js
 * @param formatType - The format type, to be added to the file name, ie .umd: package.umd.js
 * @returns {Promise<Object>}
 */
export default function buildSingle (conf, pkgType = '', formatType = '') {
  const fileExt = conf.source && conf.source.endsWith('.css') ? 'css' : 'js'
  const outfile = path.join(conf.outputDir, `${conf.name}${pkgType ? '.' + pkgType : ''}.${fileExt}`)

  const cachedFile = state.getCache(outfile)
  if (cachedFile !== null) {
    return cachedFile.rebuild().then(result => {
      state.addFile(outfile, result)
      return result
    })
  }

  const { platform, format } = getBundleFormat(conf, pkgType, formatType)

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

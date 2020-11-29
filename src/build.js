import path from 'path'
import esbuild from 'esbuild'
import state from './state.js'
import message from './message.js'

/**
 * Builds all bundles, and returns a promise that resolves after all
 * bundles are built
 * Promise returns any warnings that have been returned from esbuild
 * @returns {Promise<Object>} - Warnings returned from esbuild
 */
export default async function () {
  message.building()
  const bundles = buildBundles()
  return Promise.all(bundles).then(warnings => {
    message.built()
    message.warnings(warnings)
    return warnings
  })
}

/**
 * Beings bundling bundles, using settings from state.config.
 * Returns a Promise array of all the running builds
 * @returns {Array<Promise<Object>>} - Array of build promises
 */
function buildBundles () {
  return state.config.reduce((res, conf) => {
    if (conf.types && conf.types.length) {
      const multipleBundles = conf.types.map((pkgType, index) => {
        return buildSingle(conf, index === 0 ? '' : `.${pkgType}`)
      })
      return [...res, ...multipleBundles]
    }

    return [...res, buildSingle(conf)]
  }, [])
}

/**
 * Builds a single file, returns a promise containing any warnings
 * Settings are set in the JSON config file
 * Anything passed to conf.esbuild will override any other settings
 * @param conf - The configuration object
 * @param pkgType - The package type, to be added to the file name, ie .umd: package.umd.js
 * @returns {Promise<Object>}
 */
function buildSingle (conf, pkgType = '') {
  return esbuild.build({
    entryPoints: [conf.source],
    outfile: path.join(conf.outputDir, `${conf.name}${pkgType}.js`),
    bundle: true,
    platform: conf.platform,
    minify: conf.minify,
    sourcemap: conf.sourcemap,
    target: conf.target.length ? conf.target : undefined,
    ...conf.esbuild
  })
}

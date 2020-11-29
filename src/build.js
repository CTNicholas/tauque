import path from 'path'
import esbuild from 'esbuild'
import state from './state.js'

export default async function () {

  const result = state.config.reduce((res, conf) => {
    if (conf.types && conf.types.length) {
      return [...res, ...conf.types.map((pkgType, index) => {
        return buildSingle(conf, index === 0 ? '' : `.${pkgType}`)
      })]
    }

    return [...res, buildSingle(conf)]
  }, [])

  return Promise.all(result)
}

function buildSingle (conf, pkgType = '') {
  return esbuild.build({
    entryPoints: [conf.source],
    outfile: path.join(conf.outputDir, `${conf.name}${pkgType}.js`),
    bundle: true,
    platform: conf.platform,
    minify: conf.minify,
    sourcemap: conf.sourcemap,
    target: conf.target.length ? conf.target : undefined
  })
}

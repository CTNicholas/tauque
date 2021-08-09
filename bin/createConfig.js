import path from 'path'
import getConfigSource from './createConfigSource.js'

/**
 * Creates default tauque.json config object
 * @param packageJson
 * @returns {{}[]}
 */
export default function createConfig (packageJson) {
  const config = {}
  config.name = packageJson.name || 'package'
  config.source = getConfigSource(packageJson)
  config.type = 'all'
  config.global = ''
  config.outputDir = 'dist'
  config.watchDir = path.parse(config.source).dir
  config.target = ['es6']
  config.bundle = true
  config.minify = true
  config.sourceMap = true
  config.useEnvVariables = true
  return [config]
}

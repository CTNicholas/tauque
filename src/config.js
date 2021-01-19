import fs from 'fs'
import path from 'path'
import defaultConfig from './config.default.js'
import state from './state.js'
import message from './message.js'

/**
 * Resets state and sets up config
 * @returns {Promise<void>}
 */
export default async function () {
  state.reset()
  const customConfig = getConfig()
  state.setupConfig(customConfig)
  clearDist()
}

/**
 * Returns custom config array, taken from file if it exists, otherwise
 * copied from defaults
 * @returns {[]} - Array of configs
 */
function getConfig () {
  let customConfig = []
  const customConfigPath = path.resolve(process.cwd(), 'tauque.json')
  try {
    if (fs.existsSync(customConfigPath)) {
      let jsonData = JSON.parse(fs.readFileSync(customConfigPath))
      if (Array.isArray(jsonData)) {
        customConfig = [...jsonData]
      } else {
        customConfig.push(jsonData)
      }
    } else {
      message.noConfig('No tauque.json file found, using defaults')
    }
  } catch (err) {
    message.warn('Error in tauque.json file, using defaults', err)
  }
  return customConfig
}

/**
 * Checks that dist folder exists, and empties it
 */
function clearDist () {
  try {
    state.outputDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
          fs.unlinkSync(path.join(dir, file))
        })
      } else {
        fs.mkdirSync(dir)
      }
    })
  } catch (err) {
    message.error(err)
  }
}

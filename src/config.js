import fs from 'fs'
import path from 'path'
import state from './state/index.js'
import message from './message/index.js'

/**
 * Resets state and sets up config
 * @returns {Promise<void>}
 */
export default async function () {
  state.reset()
  const customConfig = getConfig()
  state.setupConfig(customConfig)
  createDist()
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
 * If any dist folders don't exist, create them
 */
function createDist () {
  try {
    state.outputDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
    })
  } catch (err) {
    message.error(err)
  }
}

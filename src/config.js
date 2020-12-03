import fs from 'fs'
import path from 'path'
import defaultConfig from './config.default.js'
import state from './state.js'
import message from './message.js'

export default async function () {
  state.reset()
  const customConfig = getConfig()
  state.setupConfig(customConfig)
  clearDist()
}

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

/*
function importConfig () {
  let customConfig = []
  const customConfigPath = './tauque.config.js'
  try {
    if (fs.existsSync(customConfigPath)) {
      const importedConfig = import(customConfigPath)
      if (Array.isArray(importedConfig)) {
        customConfig = [...customConfig]
      } else {
        customConfig.push(importedConfig)
      }
    } else {
      message.noConfig()
    }
  } catch (err) {
    message.configError(err)
  }
  return customConfig
}
*/

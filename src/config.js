import fs from 'fs'
import path from 'path'
import defaultConfig from './config.default.js'
import state from './state.js'
import message from './message.js'

export default async function () {
  state.reset()
  const customConfig = getConfig()
  customConfig.forEach(conf => state.config.push({...defaultConfig, ...conf}))
  state.config.forEach(conf => {
    if (!state.watchDirs.includes(conf.watchDir)) {
      state.watchDirs.push(conf.watchDir)
    }
  })
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

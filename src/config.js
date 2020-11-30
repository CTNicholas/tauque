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
  const customConfigPath = path.resolve(process.cwd(), 'esbundle.json')
  try {
    if (fs.existsSync(customConfigPath)) {
      let jsonData = JSON.parse(fs.readFileSync(customConfigPath))
      if (Array.isArray(jsonData)) {
        customConfig = [...jsonData]
      } else {
        customConfig.push(jsonData)
      }
    } else {
      message.warn('No esbundle.json file found, using defaults')
    }
  } catch (err) {
    message.warn('Error in esbundle.json file, using defaults', err)
  }
  return customConfig
}
import fs from 'fs'
import path from 'path'
import defaultConfig from './config.default.js'
import state from './state.js'

export default async function () {
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
      console.warn('No esbundle.json file found, using defaults')
    }
  } catch (err) {
    console.warn('Error in esbundle.json file, using defaults', err)
  }

  customConfig.forEach(conf => state.config.push({...defaultConfig, ...conf}))
  console.log('config:', state.config)
}

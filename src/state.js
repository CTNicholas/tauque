import fs from 'fs'
import path from 'path'
import message from './message.js'
import defaultConfig from './config.default.js'

/**
 * Default runtime state
 * @returns {{closing: boolean, watchers: [], watchDirs: [], config: []}}
 */
const defaultState = () => ({
  config: [],
  outputDirs: [],
  watchDirs: [],
  watchers: [],
  closing: false,
  waiting: false,
  buildCount: 0,
  buildTime: 0,
  buildFiles: [],
  buildCache: {}
})

// State of current runtime, initialised to defaultState
export default {
  ...defaultState(),

  // Called after config change
  configChange () {
    message.configChange()
    this.closing = true
    this.watchers.forEach(watcher => watcher.close())
    this.reset()
    message.restarting()
  },

  // Sets up state after config set
  setupConfig (customConfig) {
    customConfig.forEach(conf => this.config.push({ ...defaultConfig, ...conf }))
    this.config.forEach(conf => {
      if (!this.outputDirs.includes(conf.outputDir)) {
        this.outputDirs.push(conf.outputDir)
      }
      if (!this.watchDirs.includes(conf.watchDir)) {
        this.watchDirs.push(conf.watchDir || path.parse(conf.source).dir)
      }
    })

    const names = this.config.map(conf => conf.name)
    if (new Set(names).size !== names.length) {
      message.error('Error: Duplicate "name" properties in tauque.json. Fix and save config file.')
      this.waiting = true
    }
  },

  // Returns esbuild from cache if exists, otherwise null
  getCache (filePath) {
    if (Object.keys(this.buildCache).includes(filePath)) {
      return this.buildCache[filePath]
    }
    return null
  },

  // Adds files to buildFiles
  addFile (filePath, compileBuild) {
    const stats = fs.statSync(filePath)
    this.buildFiles.push({
      ...path.parse(filePath),
      path: filePath,
      size: stats.size
    })
    if (this.getCache(filePath) === null) {
      this.buildCache[filePath] = compileBuild
    }
  },

  // Resets state for new build
  resetBuild () {
    this.buildFiles = []
    this.buildTime = 0
  },

  // Resets state to default state, except for buildCount if it exists
  reset () {
    for (const [key, val] of Object.entries(defaultState())) {
      if (key === 'buildCount' && !isNaN(this.buildCount)) {
        continue
      }
      this[key] = val
    }
  }
}

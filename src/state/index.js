import fs from 'fs'
import path from 'path'
import message from '../message/index.js'
import defaultConfig from '../config.default.js'

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
      // Prevent outputDir duplicates
      if (!this.outputDirs.includes(conf.outputDir)) {
        this.outputDirs.push(conf.outputDir)
      }
      // Prevent watchDir duplicates
      if (!this.watchDirs.includes(conf.watchDir)) {
        this.watchDirs.push(conf.watchDir || path.parse(conf.source).dir)
      }
    })

    // Prevent overlapping watchDirs
    if (this.watchDirs.length) {
      const excludeWatchDirs = []
      this.watchDirs.forEach(dir1 => {
        this.watchDirs.forEach(dir2 => {
          if (dir1 === dir2) {
            return
          }
          if (dir1.length >= dir2.length) {
            if (dir1.substring(0, dir2.length) === dir2) {
              excludeWatchDirs.push(dir1)
            }
          } else {
            if (dir2.substring(0, dir1.length) === dir1) {
              excludeWatchDirs.push(dir2)
            }
          }
        })
      })
      this.watchDirs = excludeWatchDirs ? this.watchDirs.filter(dir => !excludeWatchDirs.includes(dir)) : this.watchDirs
    }
    this.watchDirs = [...new Set(this.watchDirs)]

    // Prevent name duplicates
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


/*
import configChange from '../message/configChange.js'
import setupConfig from './setupConfig.js'
import getCache from './getCache.js'
import resetBuild from './resetBuild.js'
import defaultState from './defaultState.js'
import fs from 'fs'
import path from 'path'

// State of current runtime, initialised to defaultState
const state = {
  ...defaultState(),
  configChange,
  setupConfig,
  getCache,

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

  resetBuild,

  reset () {
    for (const [key, val] of Object.entries(defaultState())) {
      if (key === 'buildCount' && !isNaN(this.buildCount)) {
        continue
      }
      this[key] = val
    }
  }

}

export default state
*/

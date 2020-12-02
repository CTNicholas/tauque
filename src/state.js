import fs from 'fs'
import path from 'path'

/**
 * Default runtime state
 * @returns {{closing: boolean, watchers: [], watchDirs: [], config: []}}
 */
const defaultState = () => ({
  config: [],
  watchDirs: [],
  watchers: [],
  closing: false,
  buildCount: 0,
  buildTime: 0,
  buildFiles: [],
  buildCache: {}
})

// State of current runtime, initialised to defaultState
export default {
  ...defaultState(),

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
        return null
      }
      this[key] = val
    }
  }
}

import path from 'path'
import defaultConfig from '../config.default.js'
import message from '../message/index.js'

// Sets up state after config set
export default function setupConfig (customConfig) {
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
}

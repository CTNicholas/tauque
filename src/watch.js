import path from 'path'
import watch from 'node-watch'
import state from './state.js'
import build from './build.js'
import message from './message.js'

export default async function (restart) {
  watchConfigFile(restart)
  return watchDirectories()
}

/**
 * Watches all watchDirs defined in config. Calls build when file changed detected,
 * and returns Array of build results, wrapped in a promise.
 * // Watcher filters for:
 * - node_modules
 * - .git
 * - anything beginning with .
 * - dist
 * - Any outputDirs
 * @returns {Promise<{}[]>} - Promise-wrapped array of final builds
 */
async function watchDirectories () {
  return state.watchDirs.map(async (watchDir) => {
    const finalDir = path.resolve(process.cwd(), watchDir)
    let buildResult = {}
    const dirWatcher = watch(finalDir, {
      recursive: true,
      filter (f, skip) {
        if (/\/node_modules/.test(f)) return skip
        if (/\/.git/.test(f)) return skip
        if (/\^[.]/.test(f)) return skip
        if (/\/dist/.test(f)) return skip
        if (state.outputDirs.includes(f)) return skip
        return true
      }
    }, async (evt, name) => {
      if (state.closing) {
        return null
      }
      message.change(name, evt)
      buildResult = await build()
    })
    state.watchers.push(dirWatcher)
    return buildResult
  })
}

function watchConfigFile (restart) {
  const configWatcher = watch(path.join(process.cwd(), 'tauque.json'), {}, () => {
    if (state.closing) {
      return null
    }

    state.configChange()
    restart()
  })
  state.watchers.push(configWatcher)
}
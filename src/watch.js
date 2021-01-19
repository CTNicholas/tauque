import path from 'path'
import watch from 'node-watch'
import state from './state.js'
import build from './build.js'
import message from './message.js'

const WATCH_DEBOUNCE_TIME = 50

/**
 * Watch config file and directories
 * @param {Function} restart - Callback for watchConfigFile
 * @returns {Promise<{}[]>}
 */
export default async function (restart) {
  watchConfigFile(restart)
  return watchDirectories()
}

/**
 * Watches all watchDirs defined in config. Calls build when file changed detected,
 * and returns Array of build results, wrapped in a promise.
 * Non-recursive watch when in cwd
 * @returns {Promise<{}[]>} - Promise-wrapped array of final builds
 */
async function watchDirectories () {
  return state.watchDirs.map(async (watchDir) => {
    const finalDir = path.resolve(process.cwd(), watchDir)
    let buildResult = {}
    const dirWatcher = watch(finalDir, {
      recursive: watchDir !== ''
    }, debounce(async (evt, name) => {
      if (state.closing) {
        return null
      }
      message.change(name, evt)
      buildResult = await build()
    }), WATCH_DEBOUNCE_TIME, true)
    state.watchers.push(dirWatcher)
    return buildResult
  })
}

/**
 * Watch config file for changes, run restart callback on change
 * @param {Function} restart - Callback to run
 */
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


function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

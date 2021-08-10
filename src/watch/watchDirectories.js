import path from 'path'
import nodeWatch from 'node-watch'
import state from '../state/index.js'
import message from '../message/index.js'
import build from '../build/index.js'
import debounce from './debounce.js'

const WATCH_DEBOUNCE_TIME = 50

/**
 * Watches all watchDirs defined in config. Calls build when file changed detected,
 * and returns Array of build results, wrapped in a promise.
 * Non-recursive watch when in cwd
 * @returns {Promise<{}[]>} - Promise-wrapped array of final builds
 */
export default async function watchDirectories () {
  return state.watchDirs.map(async (watchDir) => {
    const finalDir = path.resolve(process.cwd(), watchDir)
    let buildResult = {}
    const dirWatcher = nodeWatch(finalDir, {
      recursive: watchDir !== ''
    }, debounce(async (evt, name) => {
      if (state.closing) {
        return null
      }
      message.change(name, evt)
      try {
        buildResult = await build()
      } catch (err) {
        message.error(err)
      }
    }), WATCH_DEBOUNCE_TIME, true)
    state.watchers.push(dirWatcher)
    return buildResult
  })
}

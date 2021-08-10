import watchConfigFile from './watchConfigFile.js'
import watchDirectories from './watchDirectories.js'
import state from '../state/index.js'

/**
 * Watch config file and directories
 * @param {Function} restart - Callback for watchConfigFile
 * @returns {Promise<{}[]>}
 */
export default async function watch (restart) {
  if (restart) {
    state.restart = restart
  } else if (state.restart) {
    restart = state.restart
  }

  watchConfigFile()
  return watchDirectories()
}

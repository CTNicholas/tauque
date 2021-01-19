
import setConfig from './config.js'
import state from './state.js'
import build from './build.js'
import watch from './watch.js'
import message from './message.js'

// Log opening message only once
message.opening()

/**
 * Set mode, setup config, build once, then watch for file changes (if
 * in dev mode) or exit program (if in build mode)
 * On program start, and after config change, run build
 * @param {String} mode - Dev or build mode
 * @returns {Promise<void>}
 */
export default async function start (mode = getMode()) {
  state.mode = mode
  message.gettingConfig()
  await setConfig()
  message.configSet()
  const res = await build()
  if (state.mode === 'dev') {
    watch(start)
  } else {
    exitProgram()
  }
}

/**
 * Return 'dev' if --dev flag passed to console, otherwise returns 'build'
 * @returns {string} - The mode
 */
function getMode () {
  return process.argv.includes('--dev') ? 'dev' : 'build'
}

/**
 * Exits program
 */
function exitProgram () {
  process.exit(0)
}

process.on('SIGINT', () => process.exit())

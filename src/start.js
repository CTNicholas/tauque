
import setConfig from './config.js'
import state from './state.js'
import build from './build.js'
import watch from './watch.js'
import message from './message.js'

state.mode = getMode()
message.opening()

async function start () {
  message.gettingConfig()
  await setConfig()
  const res = await build()
  if (state.mode === 'dev') {
    watch(start)
  }
}

start()

/**
 * Return 'dev' if --dev flag passed to console, otherwise returns 'build'
 * @returns {string} - The mode
 */
function getMode () {
  return process.argv.includes('--dev') ? 'dev' : 'build'
}

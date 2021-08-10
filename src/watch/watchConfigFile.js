import nodeWatch from 'node-watch'
import path from 'path'
import state from '../state/index.js'

/**
 * Watch config file for changes, run restart callback on change
 */
export default function watchConfigFile () {
  const configWatcher = nodeWatch(path.join(process.cwd(), 'tauque.json'), {}, () => {
    if (state.closing) {
      return null
    }

    state.configChange()
    state.restart()
  })
  state.watchers.push(configWatcher)
}

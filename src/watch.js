import path from 'path'
import watch from 'node-watch'
import state from './state.js'
import build from './build.js'
import message from './message.js'

export default async function (restart) {
  watchConfigFile(restart)
  return watchDirectories()
}

async function watchDirectories () {
  return state.watchDirs.map(async (watchDir) => {
    const finalDir = path.resolve(process.cwd(), watchDir)
    let buildResult = {}
    const dirWatcher = watch(finalDir, { recursive: true }, async (evt, name) => {
      if (state.closing) {
        return
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

    message.configChange()
    state.closing = true
    state.watchers.forEach(watcher => watcher.close())
    state.reset()
    message.restarting()
    restart()
  })
  state.watchers.push(configWatcher)
}
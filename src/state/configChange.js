import message from '../message/index.js'

// Called after config change
export default function configChange () {
  message.configChange()
  this.closing = true
  this.watchers.forEach(watcher => watcher.close())
  this.reset()
  message.restarting()
}

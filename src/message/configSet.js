// After config is set, write entry file
import c from 'ansi-colors'
import state from '../state/index.js'
import writeLine from './writeLine.js'
import { s, w } from './text.js'

export default function configSet () {
  const entryPoints = []
  const currTime = new Date(Date.now()).toLocaleTimeString()
  writeLine(w.entryFile, s.change)
  for (const conf of state.config) {
    if (!entryPoints.includes(conf.source)) {
      writeLine(conf.source + ' ' + c.gray(currTime))
      entryPoints.push(conf.source)
    }
  }
  writeLine()
}

// Write no config messages
import writeLine from './writeLine.js'
import { s, w } from './text.js'

export default function noConfig () {
  writeLine(w.noConfig, s.noConfig)
  writeLine()
}

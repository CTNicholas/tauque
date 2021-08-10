// On config change, write config change messages
import writeLine from './writeLine.js'
import eraseAll from './eraseAll.js'
import { s, w } from './text.js'

export default function configChange () {
  eraseAll()
  // opening()
  writeLine(w.configChange, s.configChange)
  writeLine()
}

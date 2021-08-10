import path from 'path'
import writeLine from './writeLine.js'
import c from 'ansi-colors'
import eraseAll from './eraseAll.js'
import { s, w } from './text.js'

// On files change, output change message, with current time
export default function change (name) {
  const currTime = new Date(Date.now()).toLocaleTimeString()
  const fileName = path.parse(name).base
  eraseAll()
  // opening()
  writeLine(w.change, s.change)
  writeLine(`${fileName}` + ' ' + c.gray(currTime))
  writeLine()
}

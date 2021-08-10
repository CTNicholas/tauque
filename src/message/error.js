import writeLine from './writeLine.js'
import c from 'ansi-colors'
import { s } from './text.js'

// Write error
export default function error (msg) {
  writeLine(c.redBright(msg), s.error)
  writeLine()
}

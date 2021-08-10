import writeLine from './writeLine.js'
import c from 'ansi-colors'
import { s } from './text.js'

// Write warning
export default function warn (msg) {
  writeLine(c.yellow(msg), s.warn)
  writeLine()
}

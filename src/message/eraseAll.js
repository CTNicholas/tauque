// Erase all Tauque messages
import writeLine from './writeLine.js'
import cmd from 'ansi-escapes'
import state from '../state/index.js'

export default function eraseAll () {
  // writeLine(cmd.eraseLines(state.lineCount + 3))
  writeLine(cmd.eraseLines(500))
  state.lineCount = 0
}

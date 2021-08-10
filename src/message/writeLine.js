// Write message with prefix, and increment state.lineCount
import state from '../state/index.js'

export default function writeLine (msg = '', prefix = ' ') {
  process.stdout.write(prefix + ' ' + msg + '\n')
  state.lineCount++
}

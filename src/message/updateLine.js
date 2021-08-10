// Update previous line of text
import cmd from 'ansi-escapes'

export default function updateLine (msg = '', prefix = ' ') {
  process.stdout.write(cmd.eraseLines(2) + prefix + ' ' + msg + '\n')
}

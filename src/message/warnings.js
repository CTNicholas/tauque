import state from '../state/index.js'
import writeLine from './writeLine.js'
import { s, w } from './text.js'
import c from 'ansi-colors'

/**
 * After build, outputs any warnings passed by esbuild
 * @param esbuildObj
 */
export default function warnings (esbuildObj) {
  state.stage = 'warning'
  for (const warn of esbuildObj) {
    const warnObj = warn.warnings
    if (warnObj && warnObj.length) {
      writeLine()
      writeLine(w.warning, s.warn)
      warnObj.forEach(singleWarn => {
        const location = singleWarn.location
        const line = 'Line: ' + c.yellowBright(location.line)
        const column = 'Column: ' + c.yellowBright(location.column)
        const length = 'Length: ' + c.yellowBright(location.length)
        writeLine('File: ' + c.greenBright(location.file) + `, ${line}, ${column}, ${length}`)
        writeLine('Code: ')
        writeLine(c.gray(' | ') + c.greenBright(location.lineText))
        writeLine('Problem: ')
        writeLine(c.gray(' | ') + c.greenBright(singleWarn.text))
      })
    }
  }
}

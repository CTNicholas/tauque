import state from '../state/index.js'
import writeDivider from './writeDivider.js'
import writeLine from './writeLine.js'
import { s, w } from './text.js'

// On program opening, set state and write message
export default function opening () {
  state.stage = 'opening'
  writeDivider()
  writeLine()
  writeLine(w.logo, s.logo)
  writeLine()
}

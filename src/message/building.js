// On building, set state, write temporary message
import state from '../state/index.js'
import writeLine from './writeLine.js'
import { s, w } from './text.js'

export default function building () {
  state.stage = 'building'
  writeLine(w.building, s.building)
}

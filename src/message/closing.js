// On program closing, set state
import state from '../state/index.js'

export default function closing () {
  state.stage = 'closing'
}

import state from '../state/index.js'

// On program restart, set state
export default function restarting () {
  state.stage = 'restarting'
}

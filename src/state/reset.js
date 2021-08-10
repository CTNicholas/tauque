import defaultState from './defaultState.js'

// Resets state to default state, except for buildCount if it exists
export default function reset () {
  for (const [key, val] of Object.entries(defaultState())) {
    if (key === 'buildCount' && !isNaN(this.buildCount)) {
      continue
    }
    this[key] = val
  }
}

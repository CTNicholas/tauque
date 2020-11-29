/**
 * Default runtime state
 * @returns {{closing: boolean, watchers: [], watchDirs: [], config: []}}
 */
const defaultState = () => ({
  config: [],
  watchDirs: [],
  watchers: [],
  closing: false
})

// State of current runtime, initialised to defaultState
export default {
  ...defaultState(),

  // Resets state to default state
  reset () {
    for (const [key, val] of Object.entries(defaultState()))  {
      this[key] = val
    }
  }
}

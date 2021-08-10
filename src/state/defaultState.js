/**
 * Default runtime state
 * @returns {{closing: boolean, watchers: [], watchDirs: [], config: []}}
 */
const defaultState = () => ({
  config: [],
  outputDirs: [],
  watchDirs: [],
  watchers: [],
  closing: false,
  waiting: false,
  buildCount: 0,
  buildTime: 0,
  buildFiles: [],
  buildCache: {},
  stage: '',
  lineCount: 0
})

export default defaultState

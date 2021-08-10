import state from '../state/index.js'
import writeLine from './writeLine.js'
import c from 'ansi-colors'
import updateLine from './updateLine.js'
import { s, w } from './text.js'

// On build completion, returns build info (dist files, file size, build times)
export default function built () {
  state.stage = 'built'
  const bundleTime = Math.floor(state.buildTime)
  updateLine(w.dist, s.dist)
  state.buildFiles.forEach(file => {
    const size = (file.size / 1024).toFixed(2)
    writeLine(file.path + c.gray(` ${size} KiB`))
  })
  writeLine()
  writeLine(w.built, s.built)
  if (state.buildCount === 1) {
    const buildText = state.mode === 'dev' ? w.initialBuild : w.onlyBuild
    writeLine(buildText + c.gray(bundleTime + 'ms'))
  } else {
    writeLine(w.buildCount + `${state.buildCount} ` + c.gray(bundleTime + 'ms'))
  }
}

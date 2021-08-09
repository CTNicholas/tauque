import fs from 'fs'
import startTauque from '../src/start.js'

/**
 * Runs initial build
 */
export default function runBuild () {
  const dir = 'dist'
  if (fs.existsSync(dir)) {
    if (fs.readdirSync(dir).length === 0) {
      startTauque('build').then(() => process.exit(0))
    }
  } else {
    startTauque('build').then(() => process.exit(0))
  }
}

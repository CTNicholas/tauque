import commonEntryPoints from './commonEntryPoints'
import fs from 'fs'
import path from 'path'
import getPath from './getPath'

/**
 * Looks for common entry points, and returns if one exists
 * Otherwise, creates new entry point and returns
 * @param packageJson
 * @returns {string|*}
 */
export default function getConfigSource (packageJson) {
  if (packageJson.main) {
    return packageJson.main
  }

  for (const entry of commonEntryPoints(packageJson.name)) {
    if (fs.existsSync(getPath(entry))) {
      return entry
    }
  }

  if (!fs.existsSync(getPath('src'))) {
    fs.mkdirSync(getPath('src'))
  }
  fs.writeFileSync(getPath(path.join('src', 'index.js')), 'console.log(\'Edit tauque.json to change index file\')')
  return 'src/index.js'
}

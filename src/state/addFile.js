import fs from 'fs'
import path from 'path'

// Adds files to buildFiles
export default function addFile (filePath, compileBuild) {
  const stats = fs.statSync(filePath)
  this.buildFiles.push({
    ...path.parse(filePath),
    path: filePath,
    size: stats.size
  })
  if (this.getCache(filePath) === null) {
    this.buildCache[filePath] = compileBuild
  }
}

// Returns esbuild from cache if exists, otherwise null
export default function getCache (filePath) {
  if (Object.keys(this.buildCache).includes(filePath)) {
    return this.buildCache[filePath]
  }
  return null
}

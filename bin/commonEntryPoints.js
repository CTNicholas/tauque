import path from 'path'

export default function commonEntryPoints (name = '') {
  const dirs = ['src', 'lib', '']
  const files = ['index', 'entry', 'main', name]
  const exts = ['.js', '.ts', '.tsx', '.jsx', '.mjs', '.esm.js', '.cjs']
  const makeEntries = []
  dirs.forEach(d => {
    files.forEach(f => {
      exts.forEach(e => makeEntries.push(path.join(d, f) + e))
    })
  })
  return makeEntries
}

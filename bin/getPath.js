import path from 'path'

// Gets CWD
export default function getPath (p) {
  return path.resolve(process.env.INIT_CWD || path.resolve('../../', __dirname), p)
}

// Returns esbuild platform and format settings from conf + params
export default function getBundleFormat (conf, pkgType, formatType) {
  let platform = pkgType || conf.type
  let format = formatType || undefined

  let confValue = pkgType || conf.type
  if (confValue === 'module' || confValue === 'esm') {
    platform = 'browser'
    format = 'esm'
  } else if (confValue === 'browser' || confValue === 'iife') {
    platform = 'browser'
    format = 'iife'
  } else if (confValue === 'node' || confValue === 'cjs') {
    platform = 'node'
    format = 'cjs'
  }

  return { platform, format }
}

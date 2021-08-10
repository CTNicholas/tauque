import { performance } from 'perf_hooks'
import state from '../state/index.js'
import message from '../message/index.js'
import buildBundles from './buildBundles.js'

/**
 * Builds all bundles, and returns a promise that resolves after all
 * bundles are built
 * Promise returns any warnings that have been returned from esbuild
 * @returns {Promise<Object>} - Warnings returned from esbuild
 */
export default async function build () {
  if (state.waiting === true) {
    return null
  }

  message.building()
  state.resetBuild()
  const buildStart = performance.now()
  const bundles = buildBundles()
  try {
    return Promise.all(bundles).then(warnings => {
      state.buildTime = performance.now() - buildStart
      state.buildCount++
      message.built()
      message.warnings(warnings)
      return warnings
    })
  } catch (err) {
    message.error(err)
  }
}

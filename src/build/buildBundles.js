import buildSingle from './buildSingle.js'
import message from '../message/index.js'
import state from '../state/index.js'

/**
 * Builds bundles, using settings from state.config.
 * Returns a Promise array of all the running builds
 * @returns {Array<Promise<Object>>} - Array of build promises
 */
export default function buildBundles () {
  return state.config.reduce((res, conf) => {
    const formats = {
      node: 'cjs',
      browser: 'iife',
      module: 'esm'
    }

    try {
      if (conf.type === 'all') {
        const bundles = Object.entries(formats).map(([key, val]) => {
          return buildSingle(conf, key, val)
        })
        return [...res, ...bundles]
      }

      return [...res, buildSingle(conf)]
    } catch (err) {
      message.error(err)
    }
  }, [])
}

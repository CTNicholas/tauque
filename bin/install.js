#!/usr/bin/env node
import path from 'path'
import fs from 'fs'
import c from 'ansi-colors'
import {
  tauqueScripts,
  tauqueDefaultPackage,
  commonEntryPoints,
  tauqueReadme
} from './install-data.js'

runInstall()

function runInstall () {
  console.log(c.gray('__________________________________________'))
  console.log()
  console.log('Installing Tauque bundler...')
  console.log()

  // Skip config install if tauque.json found
  const tauquePath = getPath('tauque.json')
  if (fs.existsSync(tauquePath)) {
    console.log(c.bold.yellowBright('tauque.json found'))
    console.log('Skipping config creation')
    console.log()
    console.log(c.bold.greenBright('Tauque installed!'))
    console.log(c.gray('__________________________________________'))
    console.log()
    return null
  }

  // Get or create config package.json object
  let packageJson
  let packageCreated = false
  const packagePath = getPath('package.json')
  if (fs.existsSync(packagePath)) {
    packageJson = editPackage(packagePath)
    console.log('Updating package.json')
  } else {
    packageJson = createPackage(packagePath)
    console.log('Creating package.json')
    packageCreated = true
  }

  // Create tauque.json config object
  const tauqueJson = createConfig(packageJson)

  // Write package.json and tauque.json
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
  fs.writeFileSync(tauquePath, JSON.stringify(tauqueJson, null, 2))
  console.log('Config file written (tauque.json)')

  // Write readme if it doesn't exist
  const readmePath = getPath('tauque.readme.md')
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, tauqueReadme)
    console.log('Readme file written (tauque.readme.md)')
  }

  // Final message
  let buildCmd = packageJson.scripts.tauque ? 'npm run tauque' : 'npm run build'
  let devCmd = packageJson.scripts.tauque ? 'npm run tauquedev' : 'npm run dev'
  console.log()
  console.log(c.bold.greenBright('Tauque installed!'))
  console.log(c.gray('__________________________________________'))
  console.log()
  console.log(c.bold('  Config file: ' + c.cyanBright('tauque.json')))
  console.log(c.bold('  Config info: ' + c.cyanBright('tauque.readme.md')))
  console.log()
  console.log(c.bold('  Entry point: ' + c.greenBright(tauqueJson[0].source)))
  console.log()
  console.log(c.bold('Build command: ' + c.yellowBright(buildCmd)))
  console.log(c.bold('  Dev command: ' + c.yellowBright(devCmd)))
  console.log(c.gray('__________________________________________'))
  console.log()
}

/**
 * Creates default tauque.json config object
 * @param packageJson
 * @returns {{}[]}
 */
function createConfig (packageJson) {
  const config = {}
  config.name = packageJson.name || 'package'
  config.source = getConfigSource(packageJson)
  config.platform = 'all'
  config.minify = true
  config.sourcemap = true
  config.target = ['es6']
  return [config]
}

/**
 * Looks for common entry points, and returns if one exists
 * Otherwise, creates new entry point and returns
 * @param packageJson
 * @returns {string|*}
 */
function getConfigSource (packageJson) {
  if (packageJson.main) {
    return packageJson.main
  }

  for (const entry of commonEntryPoints) {
    if (fs.existsSync(getPath(entry))) {
      return entry
    }
  }

  if (!fs.existsSync(getPath('src'))) {
    fs.mkdirSync(getPath('src'))
  }
  fs.writeFileSync(getPath(path.join('src', 'index.js')), "console.log('Edit tauque.json to change index file')")
  return 'src/index.js'
}


/**
 * Creates default package.json
 * @param packagePath
 */
function createPackage(packagePath) {
  try {
    fs.writeFileSync(packagePath, JSON.stringify(tauqueDefaultPackage, null, 2))
  } catch (error) {
    console.log(error)
  }
}

/**
 * Merges scripts with current package.json content and returns as object
 * @returns {{}} - package.json content
 */
function editPackage (packagePath) {
  let loadedJson = {}
  try {
    loadedJson = JSON.parse(fs.readFileSync(packagePath))
    if (!loadedJson.scripts) {
      loadedJson.scripts = tauqueScripts
    } else {
      if (loadedJson.scripts.dev && loadedJson.scripts.dev !== tauqueScripts.dev) {
        loadedJson.scripts.tauquedev = tauqueScripts.dev
      } else {
        loadedJson.scripts.dev = tauqueScripts.dev
      }
      if (loadedJson.scripts.build && loadedJson.scripts.build !== tauqueScripts.build) {
        loadedJson.scripts.tauque = tauqueScripts.build
      } else {
        loadedJson.scripts.build = tauqueScripts.build
      }
    }
  } catch (err) {
    console.log(err)
  }
  return loadedJson
}

function getPath (p) {
  return path.resolve(process.env.INIT_CWD || path.resolve('../../', __dirname), p)
}

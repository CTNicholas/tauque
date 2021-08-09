#!/usr/bin/env node
import fs from 'fs'
import c from 'ansi-colors'
import { tauqueReadme } from './installData.js'
import createConfig from './createConfig.js'
import getPath from './getPath.js'
import createPackage from './createPackage.js'
import editPackage from './editPackage.js'

runInstall()

/**
 * Install Tauque, create config (if needed), create readme, output info
 * @returns {null}
 */
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
  const packagePath = getPath('package.json')
  if (fs.existsSync(packagePath)) {
    packageJson = editPackage(packagePath)
    console.log('Updating package.json')
  } else {
    packageJson = createPackage(packagePath)
    console.log('Creating package.json')
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

  // Final message, after a 1 second delay
  setTimeout(() => {
    let buildCmd = packageJson.scripts.tauque ? 'npm run tauque' : 'npm run build'
    let devCmd = packageJson.scripts.tauque ? 'npm run tauquedev' : 'npm run dev'
    console.log(c.gray('__________________________________________'))
    console.log()
    console.log(' ' + c.bold.bgBlueBright(' ' + 'τauque bundler installed' + ' '))
    console.log(c.gray('__________________________________________'))
    console.log()
    console.log(c.bold('  Config file: ' + c.cyanBright('tauque.json')))
    console.log(c.bold('  Config info: ' + c.cyanBright('tauque.readme.md')))
    console.log()
    console.log(c.bold('  Entry point: ' + c.greenBright(tauqueJson[0].source)))
    console.log(c.bold('Output folder: ' + c.greenBright(tauqueJson[0].outputDir)))
    console.log()
    console.log(c.bold('Build command: ' + c.yellowBright(buildCmd)))
    console.log(c.bold('  Dev command: ' + c.yellowBright(devCmd)))
    console.log(c.gray('__________________________________________'))
    console.log()
  }, 1000)

  // runBuild()
}



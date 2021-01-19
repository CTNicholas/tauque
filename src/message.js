import path from 'path'
import fs from 'fs'
import c from 'ansi-colors'
import cmd from 'ansi-escapes'
import state from './state.js'
import { getSymbols, getWords } from './text.js'

let stage = ''
let lineCount = 0
const s = getSymbols()
const w = getWords()

// On program opening, set state and write message
function opening () {
  stage = 'opening'
  writeDivider()
  writeLine()
  writeLine(w.logo, s.logo)
  writeLine()
}

// On program closing, set state
function closing () {
  stage = 'closing'
}

// On program restart, set state
function restarting () {
  stage = 'restarting'
}

// On getting config, set state
function gettingConfig () {
  stage = 'gettingConfig'
}

// After config is set, write entry file
function configSet () {
  const entryPoints = []
  const currTime = new Date(Date.now()).toLocaleTimeString()
  writeLine(w.entryFile, s.change)
  for (const conf of state.config) {
    if (!entryPoints.includes(conf.source)) {
      writeLine(conf.source + ' ' + c.gray(currTime))
      entryPoints.push(conf.source)
    }
  }
  writeLine()
}

// On building, set state, write temporary message
function building () {
  stage = 'building'
  writeLine(w.building, s.building)
}

// On build completion, returns build info (dist files, file size, build times)
function built () {
  stage = 'built'
  const bundleTime = Math.floor(state.buildTime)
  updateLine(w.dist, s.dist)
  state.buildFiles.forEach(file => {
    const size = (file.size / 1024).toFixed(2)
    writeLine(file.path + c.gray(` ${size} KiB`))
  })
  writeLine()
  writeLine(w.built, s.built)
  if (state.buildCount === 1) {
    const buildText = state.mode === 'dev' ? w.initialBuild : w.onlyBuild
    writeLine(buildText + c.gray(bundleTime + 'ms'))
  } else {
    writeLine(w.buildCount + `${state.buildCount} ` + c.gray(bundleTime + 'ms'))
  }
}

// On files change, output change message, with current time
function change (name, evt) {
  const currTime = new Date(Date.now()).toLocaleTimeString()
  const fileName = path.parse(name).base
  eraseAll()
  opening()
  writeLine(w.change, s.change)
  writeLine(`${fileName}` + ' ' + c.gray(currTime))
  writeLine()
}

// On config change, write config change messages
function configChange () {
  eraseAll()
  opening()
  writeLine(w.configChange, s.configChange)
  writeLine()
}

// Write no config messages
function noConfig () {
  writeLine(w.noConfig, s.noConfig)
  writeLine()
}

// Write warning
function warn (msg) {
  writeLine(c.yellow(msg), s.warn)
  writeLine()
}

// Write error
function error (msg) {
  writeLine(c.redBright(msg), s.error)
  writeLine()
}

/**
 * After build, outputs any warnings passed by esbuild
 * @param esbuildObj
 */
function warnings (esbuildObj) {
  stage = 'warning'
  for (const warn of esbuildObj) {
    const warnObj = warn.warnings
    if (warnObj && warnObj.length) {
      writeLine()
      writeLine(w.warning, s.warn)
      warnObj.forEach(singleWarn => {
        const location = singleWarn.location
        const line = 'Line: ' + c.yellowBright(location.line)
        const column = 'Column: ' + c.yellowBright(location.column)
        const length = 'Length: ' + c.yellowBright(location.length)
        writeLine('File: ' + c.greenBright(location.file) + `, ${line}, ${column}, ${length}`)
        writeLine('Code: ')
        writeLine(c.gray(' | ') + c.greenBright(location.lineText))
        writeLine('Problem: ')
        writeLine(c.gray(' | ') + c.greenBright(singleWarn.text))
      })
    }
  }
}

export default {
  opening,
  closing,
  restarting,
  gettingConfig,
  building,
  built,
  warnings,
  change,
  configChange,
  noConfig,
  warn,
  error,
  configSet
}

// Erase all Tauque messages
function eraseAll () {
  writeLine(cmd.eraseLines(lineCount + 3))
  lineCount = 0
}

// Write message with prefix, and increment lineCount
function writeLine (msg = '', prefix = ' ') {
  process.stdout.write(prefix + ' ' + msg + '\n')
  lineCount++
}

// Update previous line of text
function updateLine (msg = '', prefix = ' ') {
  process.stdout.write(cmd.eraseLines(2) + prefix + ' ' + msg + '\n')
}

// Write divider
function writeDivider () {
  process.stdout.write(s.divider + '\n')
}

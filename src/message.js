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

function opening () {
  stage = 'opening'
  writeDivider()
  writeLine()
  writeLine(w.logo, s.logo)
  writeLine()
}

function closing () {
  stage = 'closing'
}

function restarting () {
  stage = 'restarting'
}

function gettingConfig () {
  stage = 'gettingConfig'
}

function building () {
  stage = 'building'
  writeLine(w.building, s.building)
}

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
    writeLine(w.initialBuild + c.gray(bundleTime + 'ms'))
  } else {
    writeLine(w.buildCount + `${state.buildCount} ` + c.gray(bundleTime + 'ms'))
  }
}

function distribution () {
  //writeLine()

}

function change (name, evt) {
  const currTime = new Date(Date.now()).toLocaleTimeString()
  const fileName = path.parse(name).base
  eraseAll()
  opening()
  writeLine(w.change, s.change)
  writeLine(`${fileName}` + ' ' + c.gray(currTime))
  writeLine()
}

function configChange () {
  eraseAll()
  opening()
  writeLine(w.configChange, s.configChange)
  writeLine()
}

function noConfig () {
  writeLine(w.noConfig, s.noConfig)
  writeLine()
}

function warn (msg) {
  writeLine(c.yellow(msg), s.warn)
  writeLine()
}

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
  error
}

function eraseAll () {
  writeLine(cmd.eraseLines(lineCount + 2))
  lineCount = 0
}

function writeLine (msg = '', prefix = ' ') {
  process.stdout.write(prefix + ' ' + msg + '\n')
  lineCount++
}

function updateLine (msg = '', prefix = ' ') {
  process.stdout.write(cmd.eraseLines(2) + prefix + ' ' + msg + '\n')
}

function writeDivider () {
  process.stdout.write(s.divider + '\n')
}

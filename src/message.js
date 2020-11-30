import path from 'path'
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
  writeLine('', s.divider)
  writeLine()
  writeLine(s.logo)
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
  updateLine(w.dist, s.dist)
  state.buildNames.forEach(name => writeLine(name))
  writeLine()

  const bundleTime = Math.floor(state.buildTime)
  const currTime = new Date(Date.now()).toLocaleTimeString()
  //writeLine(`${currTime}, ${bundleTime}ms`)
  writeLine(w.built, s.built)
  //writeLine(w.built + c.dim(` (${bundleTime}ms)`), s.built)
  //writeLine(`${currTime}, (${bundleTime}ms)`)

  //writeLine(c.dim(`Bundled at ${currTime} in ${bundleTime}ms`))
  //writeLine('', s.divider)

}

function distribution () {
  //writeLine()

}

function change (name, evt) {
  const fileName = path.parse(name).base
  eraseAll()
  opening()
  writeLine(w.change, s.change)
  writeLine(`${fileName}`)
  writeLine()
}

function configChange () {
  eraseAll()
  opening()
  writeLine(w.configChange, s.configChange)
  writeLine()
}

function warn (msg) {
  writeLine(msg)
}

function error (msg) {
  writeLine(msg)
}

/**
 * After build, outputs any warnings passed by esbuild
 * @param warnings
 */
function warnings (warnings) {
  stage = 'warning'
  for (const warn of warnings) {
    if (warn.warnings && warn.warnings.length) {
      writeLine('Warning:')
      warn.warnings.forEach(w => writeLine(w))
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
  process.stdout.write(s.divider)
  lineCount++
}

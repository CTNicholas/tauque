import c from 'ansi-colors'

// Underline input
function underline (msg) {
  return `\u001B[4m${msg}\u001B[24m`
}

// Text and styling to be used in message
function getWords () {
  return {
    logo: c.bold.bgBlueBright(' ' + 'τauque bundler' + ' '),
    building: 'Building..',
    dist: c.bold.cyanBright('Files bundled'),
    built: c.bold.greenBright('Complete'),
    buildCount: 'Build ',
    initialBuild: 'Initial build ',
    onlyBuild: 'Final build ',
    change: c.bold.blueBright('File change'),
    configChange: c.bold.yellow('Config updated'),
    noConfig: c.bold.gray('No config file (tauque.json), using default settings'),
    warning: c.yellow('Warning'),
    entryFile: c.bold.blueBright('Entry point')
  }
}

// Symbols and styling to be used in messages
function getSymbols () {
  return {
    divider: c.gray('__________________________________________'),
    logo: c.bold.magentaBright(''),
    building: c.yellowBright('~'),
    dist: c.cyanBright('►'),
    built: c.greenBright('√'),
    change: c.blueBright('»'),
    configChange: c.yellow('☼'),
    noConfig: c.gray('☼'),
    warn: c.yellowBright('!'),
    error: c.redBright('‼')
  }
}

export { getWords, getSymbols }

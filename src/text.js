import c from 'ansi-colors'

function getWords () {
  return {
    building: 'Building..',
    built: c.bold.greenBright('Bundled'),
    change: c.bold.blueBright('Change'),
    configChange: c.bold.yellowBright('Config updated')
  }
}

function getSymbols () {
  return {
    divider: c.dim('_____________________________________'),
    logo: c.bgBlue.bold(' esbundle '),
    building: c.yellowBright('~'),
    built: c.greenBright('√'),
    change: c.blueBright('»'),
    configChange: c.yellowBright('☼')
  }
}

export { getWords, getSymbols }

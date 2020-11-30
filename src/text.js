import c from 'ansi-colors'

function getWords () {
  return {
    building: 'Building..',
    dist: c.bold.cyanBright('Distribute files'),
    built: c.bold.greenBright('Package bundled'),
    change: c.bold.blueBright('File change '),
    configChange: c.bold.yellowBright('Config updated')
  }
}

function getSymbols () {
  return {
    divider: c.dim('_____________________________________'),
    logo: c.bgBlue.bold(' esbundle '),
    building: c.yellowBright('~'),
    dist: c.cyanBright('►'),
    built: c.greenBright('√'),
    change: c.blueBright('»'),
    configChange: c.yellowBright('☼')
  }
}

export { getWords, getSymbols }

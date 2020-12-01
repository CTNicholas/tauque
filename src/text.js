import c from 'ansi-colors'

function getWords () {
  return {
    logo: c.bold.bgMagenta(' Τauque bundler '),
    building: 'Building..',
    dist: c.bold.cyanBright('Distribute files'),
    built: c.bold.greenBright('Package bundled'),
    change: c.bold.blueBright('File change '),
    configChange: c.bold.yellowBright('Config updated')
  }
}

function getSymbols () {
  return {
    divider: c.gray('__________________________________________'),
    logo: c.bold.magentaBright(' '),
    building: c.yellowBright('~'),
    dist: c.cyanBright('►'),
    built: c.greenBright('√'),
    change: c.blueBright('»'),
    configChange: c.yellowBright('☼')
  }
}

export { getWords, getSymbols }

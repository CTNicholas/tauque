import chalk from 'chalk'

function opening () {

}

function closing () {

}

function restarting () {

}

function gettingConfig () {

}

function building () {

}

function built () {

}

/**
 * After build, outputs any warnings passed by esbuild
 * @param warnings
 */
function warnings (warnings) {
  for (const warn of warnings) {
    if (warn.warnings && warn.warnings.length) {
      console.log('Warning:')
      warn.warnings.forEach(w => console.log(w + '\n'))
    }
  }
}

function change () {

}

function configChange () {

}

export default { opening, closing, restarting, gettingConfig, building, built, warnings, change, configChange }

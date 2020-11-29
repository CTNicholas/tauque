import build from './build.js'
import setConfig from './config.js'

async function start () {
  console.log('\nBuilding..\n')
  await setConfig()
  const res = await build()
  console.log(res)
  console.log('\nAll built\n')
}

start()

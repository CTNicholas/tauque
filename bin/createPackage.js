import fs from 'fs'
import { tauqueDefaultPackage } from './installData'

/**
 * Creates default package.json
 * @param packagePath
 */
export default function createPackage (packagePath) {
  try {
    fs.writeFileSync(packagePath, JSON.stringify(tauqueDefaultPackage, null, 2))
    return tauqueDefaultPackage
  } catch (error) {
    console.log(error)
    return null
  }
}

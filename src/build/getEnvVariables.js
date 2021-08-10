/**
 * Returns all esbuild compatible environment variables
 * @return {{}}
 */
export default function getEnvVariables () {
  const define = {}
  for (const envVar in process.env) {
    if (envVar.includes('(') || envVar.includes(')')) {
      continue
    }
    define[`process.env.${envVar}`] = JSON.stringify(process.env[envVar])
  }
  return define
}

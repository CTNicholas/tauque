import path from 'path'

export const tauqueScripts = {
  build: 'tauque',
  dev: 'tauque --dev'
}

export const tauqueDefaultPackage = {
  name: 'tauque-package',
  author: '',
  description: '',
  license: 'ISC',
  version: '1.0.0',
  scripts: tauqueScripts
}

const dirs = ['src', 'lib', '']
const files = ['index.js', 'entry.js', 'main.js']
const makeEntries =[]
dirs.forEach(d => {
  files.forEach(f => makeEntries.push(path.join(d, f)))
})
export const commonEntryPoints = makeEntries

export const tauqueReadme = `
 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄                                                                
 ███████████████  ▄██████▄   ████    ████   ▄████▄ ████ ████    ████   ▄███████▄ 
      █████      ▀▀▀   ▀███  ████    ████  ████▀▀▀█████ ████    ████  ███▀   ▀███
      █████      ▄█████████  ████    ████ ████     ████ ████    ████ ████████████
      █████▄    ████▀  ████  ████▄  ▄████ ████▄   ▄████ ████▄  ▄████ ████▄    ▄▄▄
       ▀██████  ▀██████▀███   ▀██████▀███  ▀██████▀████  ▀██████▀███  ▀████████▀▀
      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  ████  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
      B      U      N      D      L      E      R  ████  @ github.com/CTNicholas/
                                                   ▀▀▀▀
  
  Tauque allows for a single configuration object within tauque.json, or multiple
  within an array. Major thanks to evanw for creating esbuild.
  
  ## Config options
  With default settings inserted:  
  {
    // Name of the final file (required)
    "name": "packageName",
    
    // Location of the entry point (required)
    "source": "src/index.js",
    
    // Package type: "node" (cjs), "browser" (iife), "module" (esm), or "all"
    "type": "all",
    
    // Global variable name of export in iife packages
    "global": "packageName",
    
    // Bundle imports: true, false
    "bundle": true,
    
    // Minify package: true, false
    "minify": true,
    
    // Generate separate source map file
    "sourcemap": true,
    
    // Target environment, eg: ["es2020", "chrome58", "firefox57", "node12.19.1"]
    "target": ["es6"],
    
    // Directory to output package to
    "outputDir": "dist", 
    
    // Directory to watch for changes
    "watchDir": "src",
    
    // Native esbuild settings to pass on (overrides Tauque)
    "esbuild": {}   
  }
  
  Please note that comments are not allowed in JSON files.
  _______________________________________________________________________________
  
  
  ## Config examples
    
  ### Single package config 
  {
    "name": "my-package",
    "source": "src/index.js",
  }
  
  
  
  ### Multiple package config
  [
    {
      "name": "mj-project",
      "source": "src/project.js",
      "type": "node",
      "minify": false
    },
    {
      "name": "body",
      "source": "src/client/body.js",
      "type": "browser",
      "esbuild": {
        "banner": "/* Package made by CTNicholas */",
        "define": { "mode": "debug" }
      }
    }
  ]
  
  GitHub: https://github.com/CTNicholas/tauque
     NPM: https://www.npmjs.com/package/tauque
 esbuild: https://esbuild.github.io/api
   
`

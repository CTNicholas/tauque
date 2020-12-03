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

export const commonEntryPoints = [
  'src/index.js',
  'src/entry.js',
  'src/main.js',
  'lib/index.js',
  'lib/entry.js',
  'lib/main.js',
  'index.js',
  'entry.js',
  'main.js'
]

export const tauqueReadme = `
 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄                                                                
 ███████████████  ▄██████▄   ████    ████   ▄████▄ ████ ████    ████   ▄███████▄ 
      █████      ▀▀▀   ████  ████    ████  ████▀▀▀█████ ████    ████  ███▀   ▀███
      █████      ▄█████████  ████    ████ ████     ████ ████    ████ ████████████
      █████▄    ████▀  ████  ████▄   ████ ████▄   ▄████ ████▄   ████ ████▄    ▄▄▄
       ▀██████  ▀██████▀███   ▀██████▀███  ▀██████▀████  ▀██████▀███  ▀████████▀▀
      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  ████  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
      B      U      N      D      L      E      R  ████  @ github.com/CTNicholas/
                                                   ▀▀▀▀
  
  Tauque allows for a single configuration object within tauque.json, or multiple
  within an array.
  
  ## Config options
  With default settings inserted:  
  {
    // Name of the final file (required)
    "name": "packageName",
    
    // Location of the entry point (required)
    "source": "src/index.js",
    
    // Platform choice: "node" (cjs), "browser" (iife), "module" (esm), or "all"
    "platform": "all",
    
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
      "platform": "node",
      "minify": false
    },
    {
      "name": "body",
      "source": "src/client/body.js",
      "platform": "browser",
      "esbuild": {
        "banner": "/* Package made by CTNicholas */",
        "define": { "mode": "debug" }
      }
    }
  ]
  
  GitHub: https://github.com/CTNicholas/tauque
     NPM: https://www.npmjs.com/package/tauque

`

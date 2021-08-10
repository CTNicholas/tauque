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

export const tauqueReadme = `
 \`\`\`
 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄                                                                
 ███████████████  ▄██████▄   ████    ████   ▄████▄ ████ ████    ████   ▄███████▄ 
      █████      ▀▀▀   ▀███  ████    ████  ████▀▀▀█████ ████    ████  ███▀   ▀███
      █████      ▄█████████  ████    ████ ████     ████ ████    ████ ████████████
      █████▄    ████▀  ████  ████▄  ▄████ ████▄   ▄████ ████▄  ▄████ ████▄    ▄▄▄
       ▀██████  ▀██████▀███   ▀██████▀███  ▀██████▀████  ▀██████▀███  ▀████████▀▀
      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  ████  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
      B      U      N      D      L      E      R  ████  @ github.com/CTNicholas/
                                                   ▀▀▀▀
 \`\`\`  
  
  Tauque allows for a single configuration object within tauque.json, or multiple
  within an array. Major thanks to evanw for creating esbuild.
  
  ## Config options
  With default settings inserted:  
  {
    // Name of the final file (required)
    "name": "packageName",
    
    // Location of the entry point (required)
    "source": "src/index.js",
    
    // Package type: "module" (also "esm"); "browser" (also "iife"); "node" (also "cjs"); "all"
    "type": "all",
    
    // Global variable name of export in browser/iife packages
    "global": "packageName",
    
    // Directory to output package to
    "outputDir": "dist", 
    
    // Directory to watch for changes
    "watchDir": "src",
    
    // Target environment, eg: ["es2020", "chrome58", "firefox57", "node12.19.1"]
    "target": ["es6"],
    
    // Bundle imports: true, false
    "bundle": true,
    
    // Minify package: true, false
    "minify": true,
    
    // Generate separate source map file
    "sourceMap": true,
    
    // Automatically add environment variables
    "useEnvVariables": true,
    
    // Native esbuild settings to pass on (overrides Tauque)
    "esbuild": {}   
  }
  
  Please note that comments are not allowed in JSON files.
  _______________________________________________________________________________
  
  
  ## Config examples
  All unset options inherit the default settings shown above.
    
  ### Single output config 
  {
    "name": "my-package",
    "source": "src/index.js"
  }
  
  - dist/
    ¬ my-package.browser.js
    ¬ my-package.browser.js.map
    ¬ my-package.module.js
    ¬ my-package.module.js.map
    ¬ my-package.node.js
    ¬ my-package.node.js.map
  
  
  ### Multiple output config
  [
    {
      "name": "my-package.browser",
      "source": "src/index.js",
      "type": "browser"
    },
    {
      "name": "my-package.node",
      "source": "src/index.js",
      "type": "node"
    }
  ]
  
  - dist/
    ¬ my-package.browser.js
    ¬ my-package.browser.js.map
    ¬ my-package.node.js
    ¬ my-package.node.js.map
    
    
    ### Multiple input/output config
    [
      {
        "name": "my-server",
        "source": "src/server.js",
        "outputDir": "dist/server",
        "type": "module"
      },
      {
        "name": "my-client",
        "source": "src/client.js",
        "outputDir": "dist/client",
        "type": "browser"
      }
    ]
    
    - dist/
      - client/
        ¬ my-client.js
        ¬ my-client.js.map
      - server/
        ¬ my-server.js
        ¬ my-server.js.map

  
  ### Complex config
  [
    {
      "name": "client",
      "source": "src/client/index.js",
      "outputDir": "build-client",
      "type": "browser",
      "sourcemap": false,
      "minify": false,
      "esbuild": {
        "banner": "/* Package made by CTNicholas */",
        "define": {
          "mode": "debug"
        }
      }
    },
    {
      "name": "client.min",
      "source": "src/client/index.js",
      "outputDir": "build-client",
      "type": "browser"
    },
    {
      "name": "server",
      "source": "src/server.js",
      "outputDir": "build-server",
      "type": "node",
      "sourcemap": false,
      "minify": false,
      "bundle": false
    }
  ]
  
  - build-client/
    ¬ client.js
    ¬ client.min.js
    ¬ client.min.js.map
    
  - build-server/
     ¬ server.js
  
  GitHub: https://github.com/CTNicholas/tauque
     NPM: https://www.npmjs.com/package/tauque
 esbuild: https://esbuild.github.io/api
   
`

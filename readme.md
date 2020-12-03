![Tauque logo](https://raw.githubusercontent.com/CTNicholas/tauque/main/tauque.png)

Tauque (pronounced /tɔːk/, like torque) is a zero-configuration JS/TS bundler with serious pulling power.
It uses esbuild under the cover, meaning it compiles up to 100x quicker than Rollup/Webpack with Babel.
## Features
- JavaScript
- TypeScript
- CSS (files and js imports)
- JSON
- JSX

## Install
```shell
npm install tauque
```

## Config options
With default settings inserted:  
```js
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

```
Note that comments are not allowed in JSON files.
  _______________________________________________________________________________


## Config examples

### Single package config
```json
{
    "name": "my-package",
    "source": "src/index.js"
}
```



### Multiple package config
```json
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
```
  
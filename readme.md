![Tauque logo](https://raw.githubusercontent.com/CTNicholas/tauque/main/tauque.png)

Tauque (pronounced /tɔːk/, like torque) is a zero-configuration JS/TS bundler with serious pulling power. It uses esbuild under the cover, meaning it transpiles up to **100x quicker** than Rollup/Webpack with Babel.

Bundling 20 files into a single 10Kb file in 31ms, then rebundling 6 times in <10ms:

![Tauque bundling example](https://raw.githubusercontent.com/CTNicholas/tauque/main/tauque-example.gif)

### Features

- JavaScript (with optional transpilation)
- TypeScript
- CSS (files and js imports)
- JSON
- JSX

### Install

Install Tauque on a project that's already set up, and it'll take your entry point from `package.json`
and automatically create a config file that's ready to run.

```shell
npm install tauque
```

### Ready to go!

Tauque is now ready to run. Bundles will be written to the `dist` folder by default. Run tauque dev mode with:

```shell
npm run dev
```

A single time build can also be run with:

```shell
npm run build
```

### Config options

A config file will automatically be generated when you first install Tauque. The default file is tauque.json, which should be found alongside `package.json` in your project root.

All config options, with default settings:

```js
// Name of the final file (required)
"name": "packageName"

// Location of the entry point (required)
"source": "src/index.js",

// Package type: "module" (esm), "browser" (iife), "node" (cjs), or "all" (generate all)
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

// Directory for output package
"outputDir": "dist",

// Directory to watch for changes
"watchDir": "src",

// Automatically add environment variables
"useEnv": true,

// Native esbuild settings to pass on (overrides Tauque)
"esbuild": {}   
```

Note that comments are not allowed in JSON files.
  _______________________________________________________________________________

### Config examples

#### Single output config

```json
{
  "name": "my-package",
  "source": "src/index.js"
}
```

```
- dist/
  ¬ my-package.js
  ¬ my-package.js.map
```

#### Multiple output config

```json
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
```

```
- dist/
  ¬ my-package.browser.js
  ¬ my-package.browser.js.map
  ¬ my-package.node.js
  ¬ my-package.node.js.map
```

#### Multiple input/output config

```json
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
```

```
- dist/
  - client/
    ¬ my-client.js
    ¬ my-client.js.map
  - server/
    ¬ my-server.js
    ¬ my-server.js.map
```

#### Complex config

```json
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
    "type": "browser",
    "esbuild": {
      "banner": "/* Package made by CTNicholas */",
      "define": {
        "mode": "debug"
      }
    }
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
```

```
- build-client/
  ¬ client.js
  ¬ client.min.js
  ¬ client.min.js.map
  
- build-server/
   ¬ server.js
```

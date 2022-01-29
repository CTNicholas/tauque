![Tauque logo](https://raw.githubusercontent.com/CTNicholas/tauque/main/tauque.png)

Tauque (pronounced /tɔːk/, like torque) is a zero-configuration JS/TS bundler with serious pulling power. It uses esbuild under the cover, meaning it transpiles up to **100x quicker** than Rollup/Webpack with Babel.

Install:

```shell
npx install-tauque
```

Create a `dist` folder with bundles (no-config needed):

```shell
npm run dev
```

![Tauque bundling example](https://raw.githubusercontent.com/CTNicholas/tauque/main/tauque-example-1.gif)

### Tauque can bundle

- JavaScript (with optional transpilation)
- TypeScript
- JSX
- CSS (files and js imports)
- JSON

Dev mode watching for file changes and running cumulative builds, most taking around 10ms:

![Tauque bundling example](https://raw.githubusercontent.com/CTNicholas/tauque/main/tauque-example-2.gif)

### Install

Install Tauque on a project that's already set up, and it'll take your entry point from `package.json` (or try to find it elsewhere)
and automatically create a config file that's ready to run.

```shell
npx install-tauque
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

### Alternative install
You can also Tauque without building config and readme files:
```shell
npm install tauque
```

### Config options

A `tauque.json` config file will automatically be generated when you first install Tauque. 
This should be placed alongside `package.json` in your project root.

All config options, with default settings:

```js
// Name of the final file (required)
"name": "packageName"

// Location of the entry point (required)
"source": "src/index.js",

// Package type: "module" (also "esm"); "browser" (also "iife"); "node" (also "cjs"); "all"
"type": "all",

// Global variable name of export in browser/iife packages
"global": "packageName",

// Directory for output package
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
```

Note that comments are not allowed in JSON files.
_______________________________________________________________________________

### Config examples

A list of `tauque.json` config examples with the `dist` folders they create.
All unset options inherit the default settings shown above.

#### Single output config

```json
{
  "name": "my-package",
  "source": "src/index.js"
}
```

```
- dist/
  ¬ my-package.browser.js
  ¬ my-package.browser.js.map
  ¬ my-package.module.js
  ¬ my-package.module.js.map
  ¬ my-package.node.js
  ¬ my-package.node.js.map
```

#### Multiple output config

```json
[
  {
    "name": "my-iife-package",
    "source": "src/index.js",
    "type": "browser"
  },
  {
    "name": "my-esm-package",
    "source": "src/index.js",
    "type": "module"
  }
]
```

```
- dist/
  ¬ my-iife-package.js
  ¬ my-iife-package.js.map
  ¬ my-esm-package.js
  ¬ my-esm-package.js.map
```

#### Multiple input/output config

```json
[
  {
    "name": "my-client",
    "source": "src/client.js",
    "outputDir": "dist/client",
    "type": "browser"
  },
  {
    "name": "my-server",
    "source": "src/server.js",
    "outputDir": "dist/server",
    "type": "node"
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
```

```
- build-client/
  ¬ client.js
  ¬ client.min.js
  ¬ client.min.js.map
  
- build-server/
   ¬ server.js
```

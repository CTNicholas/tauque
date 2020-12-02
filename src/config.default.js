export default {
  // Final file name
  name: 'package',

  // Location of file to transform
  source: 'src/index.js',

  // 'iife' / 'cjs' / 'esm'
  //types: ['iife', 'cjs', 'esm'],

  // 'node' / 'browser' / 'both'
  platform: 'node',

  // Global name, only applies to iife
  globalName: '',

  // Output directory
  outputDir: 'dist',

  // Bundle imports
  bundle: true,

  // Minify file
  minify: true,

  // Generate separate source map
  sourcemap: true,

  // Target environment, ie: ['es2020', 'chrome58', 'firefox57', 'node12.19.0']
  target: ['es6'],

  // Directory to watch for changes while running dev mode
  watchDir: 'src',

  // Settings to apply to esbuild
  esbuild: {}
}

export default {
  // Final file name
  name: 'packageName',

  // Location of file to transform
  source: 'src/index.js',

  // 'iife' / 'cjs' / 'esm'
  //types: ['iife', 'cjs', 'esm'],

  // 'node' 'cjs' / 'browser' 'iife' / 'module' 'esm' / 'all'
  type: 'all',

  // Global name, only applies to iife
  global: '',

  // Output directory
  outputDir: 'dist',

  // Bundle imports
  bundle: true,

  // Minify file
  minify: true,

  // Generate separate source map
  sourceMap: true,

  // Target environment, ie: ['es2020', 'chrome58', 'firefox57', 'node12.19.0']
  target: ['es6'],

  // Directory to watch for changes while running dev mode
  //watchDir: 'src',

  // Bundle environment variables
  useEnvVariables: true,

  // Settings to apply to esbuild
  esbuild: {}
}

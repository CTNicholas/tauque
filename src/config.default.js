export default {
  // Final file name
  name: 'project',

  // Location of file to transform
  source: 'src/index.js',

  // 'node' or 'browser'
  platform: 'browser',

  // Output directory
  outputDir: 'dist',

  // Bundle imports
  bundle: true,

  // Minify file
  minify: true,

  // Generate separate source map
  sourcemap: true,

  // Target environment, ie: ['es2020', 'chrome58', 'firefox57', 'node12.19.0']
  target: [],

  // Directory to watch for changes while running dev mode
  watchDir: 'src',

  // Settings to apply to esbuild
  esbuild: {}
}

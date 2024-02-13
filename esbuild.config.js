const esbuild = require('esbuild');

console.log('Transpiling changes...');

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  external: ['debug', 'koa-bodyparser'],
  outfile: 'dist/index.js',
  logLevel: 'warning',
}).then(() => {
  console.log('✅ Build completed successfully');
}).catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});

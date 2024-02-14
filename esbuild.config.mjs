import esbuild from 'esbuild';

console.log('Transpiling changes...');

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  external: ['debug', 'koa-bodyparser'],
  outfile: 'dist/index.js',
  logLevel: 'warning'
}).then(() => {
  console.log('✅ Build completed successfully');
}).catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});

/*
CommonJS:

- Compatibility: It is widely supported and has been the default in Node.js for many years.
- Synchronization: Uses require() to import modules, which is synchronous and can be simpler to understand and debug in certain cases.
- Tools: Some older tools or libraries may expect CommonJS, which can make integration easier.

ESNext (ES Modules):

- Modernity: It is the modern standard for JavaScript and is being adopted by Node.js and modern browsers.
- Features: Supports features such as static and dynamic import, which can offer more flexibility and optimizations during bundling.
- Tree Shaking: Better support for tree shaking (dead code elimination) in bundling tools like Webpack, Rollup and esbuild.

Despite having Required in the initial code I decided to keep ESNext, for its modernity and new features.
*/
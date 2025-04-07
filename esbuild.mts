import path from 'path';
import { readdir } from 'fs/promises';
import { build, BuildOptions, context } from 'esbuild';


const functionFiles = await readdir(path.resolve('src/handlers'), { recursive: true });
const files = functionFiles
    .filter(file => !file.includes('test'))
    .filter(file => file.includes('\\'))
    .map((file) => path.resolve('src/handlers', file));

const params = {
    entryPoints: files,
    outdir: '.aws-sam/build',
    entryNames: '[name]/[name]', // Output file name // '[name]Function/[name]'
    platform: 'node',
    format: 'esm',
    sourcemap: false,
    bundle: true,
    packages: 'external',
    outExtension: { '.js': '.mjs' },
} as BuildOptions;

if (process.argv.includes('--watch')) {
    const ctx = await context(params);
    await ctx.watch();
} else {
    await build(params);
}

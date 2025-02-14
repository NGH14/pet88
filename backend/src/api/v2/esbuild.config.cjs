const esbuild = require('esbuild');

esbuild.build({
	entryPoints: ['src/*'],
	bundle: true,
	minify: true,
	external: ['node_module', 'sharp'],
	loader: { '.node': 'file' },
	legalComments: 'none',
	outdir: 'build',
	platform: 'node',
});

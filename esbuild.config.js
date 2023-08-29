const esbuild = require('esbuild');

esbuild.build({
	entryPoints: [`src/*`],
	bundle: true,
	minify: true,
	external: ['node_module', 'sharp'],
	legalComments: 'none',
	loader: { '.node': 'file' },
	outdir: 'build',
	platform: 'node',
});

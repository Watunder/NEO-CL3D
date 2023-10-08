export default {
	input: {
        'ss6player-cl3d': './src/ss6player-cl3d/main.js',
        'rekapi': './src/rekapi/main.js',
    },
	output: {
        format: 'esm',
		dir: './dist/',
        entryFileNames: '[name].mjs',
	}
};
export default {
	input: {
        'behavior3-cl3d': './src/behavior3-cl3d/main.js', 
        'creature-cl3d': './src/creature-cl3d/main.js', 
        'ss6player-cl3d': './src/ss6player-cl3d/main.js',
        'rekapi': './src/rekapi/main.js',
        'ldtk-cl3d': './src/ldtk-cl3d/main.js',
        'yuka-cl3d': './src/yuka-cl3d/main.js',
    },
	output: {
        format: 'esm',
		dir: './dist/',
        entryFileNames: '[name].mjs',
	}
};
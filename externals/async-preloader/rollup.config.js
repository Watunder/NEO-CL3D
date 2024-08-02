export default [
	{
		input: './dist/lib/index.js',
		output: {
			format: 'esm',
			file: './dist/async-preloader.js'
		},
		context: 'globalThis'
	},
	{
		input: './dist/lib/index.js',
		output: {
			format: 'umd',
			name: 'async-preloader',
			file: './dist/async-preloader.umd.js',
			exports: 'named'
		},
		context: 'globalThis'
	}
]
export default [
	{
		input: './dist/lib/index.js',
		output: {
			format: 'esm',
			file: './dist/html-to-image.js'
		},
		context: 'globalThis'
	},
	{
		input: './dist/lib/index.js',
		output: {
			format: 'umd',
			name: 'html-to-image',
			file: './dist/html-to-image.umd.js'
		},
		context: 'globalThis'
	}
]
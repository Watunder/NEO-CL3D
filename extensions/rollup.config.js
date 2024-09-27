import path from 'path';
import { globSync } from 'glob';
import replace from '@rollup/plugin-replace';

const onwarn = (warning, rollupWarn) => {
	const ignoredWarnings = [
		{
			ignoredCode: 'CIRCULAR_DEPENDENCY',
			ignoredPath: './_lib/global/index.js',
		}
	];

	if (!ignoredWarnings.some(({ ignoredCode, ignoredPath }) => (
		warning.code === ignoredCode &&
		warning.ids.includes(path.resolve(ignoredPath))))
	) {
		rollupWarn(warning)
	}
}

const imports = [
	{
		globalModules: [
			'global',
		],
		libModules: [
			'ammo',
			'cl3d',
			'creature',
			'effekseer',
			'fairygui-dom',
			'fmodstudio',
			'html-to-image',
			'mitt',
			'rekapi',
			'ss6player-lib'
		]
	}
];

let replacedImports = {};
if (imports.some(({ libModules }) => {
	for (let i = 0; i < libModules.length; ++i) {
		replacedImports[`'${libModules[i]}'`] = `from "./${libModules[i]}.js";`;
	}
}));

let replacedDomains = {};
if (imports.some(({ globalModules, libModules }) => {
	for (let i = 0; i < globalModules.length; ++i) {
		replacedDomains[`"${globalModules[i]}"`] = `from "__dirname/${globalModules[i].slice(globalModules[i].lastIndexOf("/") + 1)}.js";`;
	}

	for (let i = 0; i < libModules.length; ++i) {
		replacedDomains[`"${libModules[i]}"`] = `from "__dirname/${libModules[i]}.js";`;
	}
}));

export default [
	{
		input: './_lib/global/index.js',
		onwarn,
		output: {
			format: 'esm',
			file: './_out/global.js'
		},
		external: [
			...imports[0].libModules
		]
	},
	{
		input: './_out/global.js',
		plugins: [
			replace({
				delimiters: ['from ', ';'],
				values: replacedImports,
				preventAssignment: true
			})
		],
		output: {
			format: 'esm',
			file: './_out/global.js'
		},
		external: [
			...Object.values(replacedImports).map((string) => {
				const reg = /\"(.*?)\"/g;
				return reg.exec(string)[1];
			})
		]
	},
	{
		input: [
			...globSync([
				'./action/*.js',
				'./behavior/*.js'
			]).map((file) => {
				return file;
			})
		],
		plugins: [
			replace({
				delimiters: ['from ', ';'],
				values: replacedDomains,
				preventAssignment: true
			})
		],
		output: {
			format: 'esm',
			dir: './_out/embedded/',
			chunkFileNames: '[name].js',
		},
		external: [
			...Object.values(replacedDomains).map((string) => {
				const reg = /\"(.*?)\"/g;
				return reg.exec(string)[1];
			})
		]
	}
];
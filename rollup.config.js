import url from 'url';
import path from 'path';
import { globSync } from 'glob';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import { generateDTS } from '@typhonjs-build-test/esm-d-ts';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const editorRollupConfig = await import('./extensions/lib/cl3d-editor/rollup.config.js').then((module) => {
	return module.default[0];
});

editorRollupConfig.input = path.join(__dirname, "./extensions/lib/cl3d-editor", editorRollupConfig.input);
editorRollupConfig.output.file = path.join(__dirname, "./extensions/lib/cl3d-editor", editorRollupConfig.output.file);

const onwarn = (warning, rollupWarn) => {
    const ignoredWarnings = [
        {
            ignoredCode: 'CIRCULAR_DEPENDENCY',
            ignoredPath: './extensions/lib/global/index.js',
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
			'./lib/global',
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
		input: './extensions/lib/global/index.js',
		onwarn,
		output: {
			format: 'esm',
			file: './extensions/out/global.js'
		},
		external: [
			...imports[0].libModules
		]
	},
	{
		input: './extensions/out/global.js',
		plugins: [
			replace({
				delimiters: ['from ', ';'],
				values: replacedImports,
				preventAssignment: true
			})
		],
		output: {
			format: 'esm',
			file: './extensions/out/global.js'
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
			...globSync('./extensions/*.js').map((file) => {
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
			dir: './extensions/out/embedded/',
			chunkFileNames: '[name].js',
		},
		external: [
			...Object.values(replacedDomains).map((string) => {
				const reg = /\"(.*?)\"/g;
				return reg.exec(string)[1];
			})
		]
	},
	editorRollupConfig
];
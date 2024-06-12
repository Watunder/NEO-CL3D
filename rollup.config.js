import path from 'path';
import { globSync } from 'glob';
import terser from '@rollup/plugin-terser';
import replace from "@rollup/plugin-replace";
import { generateDTS } from '@typhonjs-build-test/esm-d-ts';

const onwarn = (warning, rollupWarn) => {
    const ignoredWarnings = [
        {
            ignoredCode: 'CIRCULAR_DEPENDENCY',
            ignoredPath: './extensions/lib/global.js',
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
			'./lib/global.js',
		],
		libModules: [
			'cl3d',
			'mitt',
			'rekapi',
			'ss6player-lib'
		]
	}
];

let replacedDomains = {};
if (imports.some(({ globalModules, libModules }) => {
	for (let i = 0; i < globalModules.length; ++i) {
		replacedDomains[`"${globalModules[i]}"`] = `from "__dirname/${globalModules[i].slice(globalModules[i].lastIndexOf("/") + 1)}";`;
	}

	for (let i = 0; i < libModules.length; ++i) {
		replacedDomains[`"${libModules[i]}"`] = `from "__dirname/${libModules[i]}.js";`;
	}
}));

export default [
	{
		input: './extensions/lib/global.js',
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
			dir: './extensions/out/',
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
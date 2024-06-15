import path from 'path';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import { generateDTS } from '@typhonjs-build-test/esm-d-ts';

const onwarn = (warning, rollupWarn) => {
    const ignoredWarnings = [
        {
            ignoredCode: 'CIRCULAR_DEPENDENCY',
            ignoredPath: './index.js',
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
        libModules: [
            'cl3d'
        ],
        builtinModules: [
            'child_process',
            'module',
            'path',
            'fs'
        ],
        externalModules: [
            'cl3d',
            'canvas',
            'nc-screen',
            '@kmamal/gl',
            '@kmamal/sdl',
            'file-fetch'
        ],
        optionalModules: [
            '3d-core-raub',
            'image-raub'
        ]
    }
];

let replacedImports = {};
if (imports.some(({ libModules }) => {
    for (let i = 0; i < libModules.length; ++i) {
        replacedImports[`'${libModules[i]}'`] = `from "./${libModules[i]}.js";`;
    }
}));

export default [
    {
        input: './index.js',
        onwarn,
        plugins: [
            //generateDTS.plugin(),
            //terser()
            replace({
                delimiters: ['from ', ';'],
                values: replacedImports,
                preventAssignment: true
            })
        ],
        output: {
            format: 'esm',
            file: './dist/cl3d-editor.js'
        },
        external: [
            ...imports[0].builtinModules,
            ...imports[0].externalModules,
            ...imports[0].optionalModules,
			...Object.values(replacedImports).map((string) => {
				const reg = /\"(.*?)\"/g;
				return reg.exec(string)[1];
			})
		]
    }
]
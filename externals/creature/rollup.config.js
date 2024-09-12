import { generateDTS } from '@typhonjs-build-test/esm-d-ts';

export default [
    {
        input: './index.js',
        plugins: [
            generateDTS.plugin()
        ],
        output: {
            format: 'esm',
            file: './dist/creature.js'
        }
    }
]
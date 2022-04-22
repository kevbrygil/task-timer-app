module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2021,
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        sourceType: 'module',
        codeFrame: true,
    }, // to enable features such as async/await
    ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
    extends: ['next', 'next/core-web-vitals', 'eslint:recommended', 'plugin:react/recommended', 'prettier'],
    plugins: ['react', 'prettier'],
    rules: {
        'template-curly-spacing': [0, 'always'],
        'array-bracket-spacing': [0, 'always'],
        'object-curly-spacing': [0, 'always'],
        'computed-property-spacing': [0, 'always'],
        'no-multiple-empty-lines': [
            2,
            {
                max: 1,
                maxEOF: 0,
                maxBOF: 0,
            },
        ],
        quotes: [1, 'single', 'avoid-escape'],
        'no-use-before-define': [
            2,
            {
                functions: false,
            },
        ],
        semi: [1, 'never'],
        'prefer-const': 1,
        'react/prefer-es6-class': 1,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-curly-spacing': [0, 'always'],
        'react/jsx-indent': [2, 4],
        'react/prop-types': [1],
        'react/no-array-index-key': [1],
        'class-methods-use-this': ['off'],
        'no-undef': [1],
        'no-case-declarations': [1],
        'no-return-assign': [1],
        'no-param-reassign': [1],
        'no-shadow': [1],
        camelcase: [1],
        'no-underscore-dangle': 'off',
        indent: [2, 4, { SwitchCase: 1 }],
        'prettier/prettier': [
            'error',
            {
                bracketSameLine: true,
                bracketSpacing: true,
                printWidth: 120,
                singleQuote: true,
                tabWidth: 4,
                arrowParens: 'always',
                endOfLine: 'auto',
            },
        ],
        'max-len': ['error', { code: 150, ignoreTrailingComments: true, ignoreStrings: true }],
        '@next/next/no-img-element': 'off',
        '@next/next/no-html-link-for-pages': 'off',
    },
    overrides: [
        // This configuration will apply only to TypeScript files
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            settings: { react: { version: 'detect' } },
            env: {
                browser: true,
                node: true,
                es6: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended', // TypeScript rules
                'plugin:react/recommended', // React rules
                'plugin:react-hooks/recommended', // React hooks rules
                'plugin:jsx-a11y/recommended', // Accessibility rules
                'plugin:prettier/recommended',
            ],
            rules: {
                // We will use TypeScript's types for component props instead
                'react/prop-types': 'off',

                // No need to import React when using Next.js
                'react/react-in-jsx-scope': 'off',

                // This rule is not compatible with Next.js's <Link /> components
                'jsx-a11y/anchor-is-valid': 'off',

                // Why would you want unused vars?
                '@typescript-eslint/no-unused-vars': ['error'],

                // I suggest this setting for requiring return types on functions only where useful
                '@typescript-eslint/explicit-function-return-type': [
                    'warn',
                    {
                        allowExpressions: true,
                        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
                    },
                ],

                'prettier/prettier': [
                    'error',
                    {
                        bracketSameLine: true,
                        printWidth: 120,
                    },
                    { usePrettierrc: true },
                ],
            },
        },
    ],
}

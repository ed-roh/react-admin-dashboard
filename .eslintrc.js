module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: 0,
        'no-console': 2,
        'no-debugger': 2,
        'no-else-return': 1,
        semi: [1, 'always'],
        'space-unary-ops': 2,
        'no-console': 'warn',
        'react/prop-types': 0,
        'no-unused-vars': 'off',
        'prettier/prettier': 'off',
        'consistent-return': 'off',
        'react/display-name': 'off',
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true
            }
        ],
        'no-extra-boolean-cast': 'off'
    }
};
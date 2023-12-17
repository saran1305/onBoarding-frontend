module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.{js,cjs}'
            ],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        'array-bracket-spacing': [ 'error', 'always', { objectsInArrays: false, singleValue: false }],
        'no-console': 'warn',
        'computed-property-spacing': [ 'error', 'never' ],
        indent: [
            'error',
            4,
            {
                ignoredNodes: ['TemplateLiteral']
            }
        ],
        'space-before-function-paren': [ 'error', { anonymous: 'always', named: 'always', asyncArrow: 'always' }],
        'id-length': [ 'error', { 'exceptions': [ '$', '_', 'i', 'j' ] }],
        'newline-after-var': [ 'error', 'always' ],
        'comma-dangle': [ 'error', 'never' ],
        'arrow-parens': [ 'error', 'as-needed' ],
        'quotes': [ 'error', 'single', { avoidEscape: true }],
        'object-curly-spacing': [ 'error', 'always' ],
        'no-underscore-dangle': 0,
        'linebreak-style': 0,
        'no-var': ['error'],
        'max-len': [ 'error', { 'code': 200, 'tabWidth': 4, 'ignoreStrings': true, 'ignoreTemplateLiterals':  true }],
        'spaced-comment': [ 'error', 'always', { 'markers': [ 'global', 'eslint' ] }],
        'jsx-quotes': [ 'error', 'prefer-double' ],
        'react/jsx-indent': [ 'error', 4 ],
        'react/jsx-indent-props': [ 'error', 4 ],
        'react/jsx-fragments': [ 'error', 'element' ],
        'react/jsx-no-comment-textnodes': 'off'
    }
    // "rules": {
    //     "array-bracket-spacing": [ "error", "always", { "objectsInArrays": false, "singleValue": false }],
    //     "arrow-parens": [ "error", "as-needed" ],
    //     "computed-property-spacing": [ "error", "never" ],
    //     "comma-dangle": [ "error", "never" ],
    //     "no-bitwise": [ "error", { "allow": ["~"] }],
    //     "quote-props": [ "error", "as-needed", { "keywords": true }],
    //     "quotes": [ "error", "single", { "avoidEscape": true }],
    //     "no-undefined": 0,
    //     "no-plusplus": [ "error", { "allowForLoopAfterthoughts": true }],
    //     "object-curly-newline": 0,
    //     "object-curly-spacing": [ "error", "always" ],
    //     "no-ternary": 0,
    //     "no-underscore-dangle": 0,
    //     "linebreak-style": 0,
    //     "padded-blocks": 0,
    //     "object-shorthand": 0,
    //     "no-var": ["error"],
    //     "no-console": "warn",
    //     "sort-vars": 0,
    //     "no-magic-numbers": [ "error", {"ignore": [ -1, 0, 1 ]}],
    //     "id-length": [ "error", {"exceptions": [ "$", "_", "i", "j" ] }],
    //     "max-len": [ "error", {"code": 200, "tabWidth": 4, "ignoreStrings": true, "ignoreTemplateLiterals":  true }],
    //     "max-params": 0,
    //     "max-statements": [ "error", 20 ],
    //     "multiline-ternary": "off",
    //     "newline-after-var": [ "error", "always" ],
    //     "newline-before-return": "off",
    //     "newline-per-chained-call": "off",
    //     "prefer-arrow-callback": 0,
    //     "prefer-reflect": 0,
    //     "prefer-template": 0,
    //     "spaced-comment": [ "error", "always", { "markers": [ "global", "eslint" ] }],
    //     "space-before-function-paren": [ "error", { "anonymous": "always", "named": "always", "asyncArrow": "always" }],
    //     "no-invalid-this": 0,
    //     "dot-location": 0,
    //     "eol-last": 0,
    //     "func-names": 0,
    //     "global-require": 0,
    //     "require-jsdoc": 0,
    //     "valid-jsdoc": 0,
    //     "sort-keys": 0,
    //     "prefer-destructuring": 0,
    //     "indent": [
    //         "error",
    //         4,
    //         {
    //             "ignoredNodes": ["TemplateLiteral"]
    //         }
    //     ],
    //     "jsx-quotes": [ "error", "prefer-double" ],
    //     "react/jsx-indent": [ "error", 4 ],
    //     "react/jsx-indent-props": [ "error", 4 ],
    //     "react/jsx-fragments": [ "error", "element" ],
    //     "react-hooks/rules-of-hooks": "error",
    //     "react-hooks/exhaustive-deps": "warn"
    // }
}

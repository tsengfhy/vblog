---
title: React 攒机之旅 --- 编码助手
date: 2020-08-11
categories:
- js
tags:
- react
---

## 前言

所谓工欲善其事、必先利其器，不知各位工友们觉得如何，反正我已经被各种左缩右进，错误横飞的语句折磨的快自闭了。
举个例子，前一阵我们的一次review，同事指出，eval存在安全隐患，所以不宜使用。在佩服他技术能力的同时，更令我钦佩的是他敏锐的观察力。
自我评价我是没有精力看的这么仔细的，而且我比较懒，希望工具替我解决大部分这种麻烦。
我希望在我写代码的过程中，工具自动帮我找出高危及逻辑漏洞，而对于那种可以程序处理的bug，如果能不烦我那是最好的。
本节主要内容包含eslint, stylelint, prettier规则的选择，以及代码提交校验。

## Prettier

这里推荐使用js文件做配置文件，包括下面的都是，因为在js中我们可以编写条件性的配置规则，示例参见 Stylelint 节。

Prettier 的配置很常规，网上随意copy即可。
```js
// .prettierrc.js
module.exports = {
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    arrowParens: 'avoid',
    endOfLine: 'auto',
}
```

## Eslint 

Eslint 的配置在 CRA 默认配置的基础上集成了 Prettier, 并且针对可自动处理的规则的提示级别进行了降级。

```js
// .eslintrc.js
module.exports = {
    extends: ['eslint:recommended', 'react-app', 'plugin:prettier/recommended'],
    rules: {
        //extend ‘prettier‘ to resolve conflict, and we close it as it will be fixed automatically when run ‘git commit’
        'prettier/prettier': 'off',
        curly: 'warn',
        'default-case': 'warn',
        'no-var': 'warn',
        'no-debugger': 'warn',
        'no-return-await': 'warn',
        'no-useless-call': 'warn',
        'no-useless-return': 'warn',
        'no-duplicate-imports': 'warn',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'no-caller': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-implied-eval': 'error',
        'no-iterator': 'error',
        'no-invalid-this': 'error',
        'no-proto': 'error',
        'no-self-compare': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-shadow': 'error',
        'no-use-before-define': 'error',
    },
};
```
## Stylelint

Stylelint 在推荐配置的基础上，增加了stylelint-config-recess-order， 此插件自动处理CSS顺序混乱的问题，同时对可自动处理的规则降级。

```js {8}
// .stylelintrc.js
const orderConfig = require('stylelint-config-recess-order');

module.exports = {
    extends: ['stylelint-config-recommended'],
    plugins: [
        'stylelint-no-unsupported-browser-features',
        ...orderConfig.plugins,
    ],
    rules: {
        //add order rules and it will be fixed automatically when run ‘git commit’
        'order/properties-order': [
            orderConfig.rules['order/properties-order'],
            {
                severity: 'warning',
            },
        ],
        'plugin/no-unsupported-browser-features': [
            true,
            {
                severity: 'warning',
            },
        ],
        'at-rule-no-unknown': null,
        'at-rule-name-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
        'color-hex-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
        'color-hex-length': [
            'long',
            {
                severity: 'warning',
            },
        ],
        'function-name-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
        'length-zero-no-unit': [
            true,
            {
                severity: 'warning',
            },
        ],
        'media-feature-name-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
        'property-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
        'selector-pseudo-class-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
        'selector-pseudo-element-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
        'selector-pseudo-element-colon-notation': [
            'double',
            {
                severity: 'warning',
            },
        ],
        'selector-type-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
        'unit-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
        'value-keyword-case': [
            'lower',
            {
                severity: 'warning',
            },
        ],
    }
};
```

```js {11-13}
// config/overrides.js
const StylelintPlugin = require('stylelint-webpack-plugin');

const paths = require('./paths');

module.exports = {
    webpack: (config, env) => {

        config.plugins.push(
            ...[
                new StylelintPlugin({
                    context: paths.appSrc,
                }),
            ].filter(Boolean)
        );

        return config;
    }
}

```

## Husky & lint_staged

添加此配置后，以上lints将在git commit时自动运行，能自动处理的将自动处理，处理不了的将提交失败。

```json
// package.json
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "src/**/*.{js,jsx,ts,tsx}": [
            "eslint --fix",
            "git add"
        ],
        "src/**/*.{css,scss,sass}": [
            "stylelint --fix",
            "git add"
        ],
        "src/**/*.{js,jsx,ts,tsx,css,scss,sass}": [
            "prettier --write",
            "git add"
        ]
    }
}
```
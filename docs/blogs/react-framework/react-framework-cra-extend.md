---
title: React 攒机之旅 --- 魔改CRA
date: 2020-08-10
categories:
- js
tags:
- react
---

## 前言

扩展CRA的方法大致有两种。

第一种是执行 eject，此种方式可获得全部配置权，但也会失去随着CRA版本更新的能力。

第二种是引入 react-app-rewired, 对CRA的默认配置进行扩展，这也是我选择的方式。

## 配置入口

默认的配置入口是根目录下的config-overrides.js文件，并且在用 react-app-rewired 代替 react-scripts 运行对应的脚本时生效。

但是我希望将工程的所有配置文件放在一个单独的目录下，配置方式如下：

```json
// package.json
{
    config-overrides-path: "config/overrides"
}
```
## config-overrides.js 基本结构

导出对象中包含三个属性，见名知意，分别是对webpack、jest 和 react-scripts 中 paths 的修改和扩展。

一般情况下，我们都是修改webpack的配置，而后两项很少使用，若要扩展 paths，请参考下一条。

```js
module.exports = {
    webpack: (config, env) => {},
    jest: config => {},
    paths: (config, env) => {}
}

```

## Paths 扩展

在扩展 paths 时遇到两个坑。

第一个，在 react-app-rewired v2.1.6之前，对 paths 的修改不会在 CRA 的 webpack 中生效。原因是在执行 paths 变更之前已经加载 webpack 配置。[链接](https://github.com/timarney/react-app-rewired/commit/b6f727d792b818ddfe1fd79c36d97c9f6d91e650)

第二个，请勿轻易使用 react-app-rewired 导出的扩展 paths。 原因是，此包中的 paths 是在未引入 ***环境变量*** 的情况下对其进行的扩展，因此参数可能不是最新。该问题在 v2.1.6 中尚未解决。

至于为什么要使用 paths， 请参见下一条。

## Paths 的使用

### Paths 的导出对象
首先看一下 paths 中都导出哪些内容。

```js
// react-scripts/config/paths
module.exports = {
    dotenv: resolveOwn(`${templatePath}/.env`),
    appPath: resolveApp('.'),
    appBuild: resolveOwn('../../build'),
    appPublic: resolveOwn(`${templatePath}/public`),
    appHtml: resolveOwn(`${templatePath}/public/index.html`),
    appIndexJs: resolveModule(resolveOwn, `${templatePath}/src/index`),
    appPackageJson: resolveOwn('package.json'),
    appSrc: resolveOwn(`${templatePath}/src`),
    appTsConfig: resolveOwn(`${templatePath}/tsconfig.json`),
    appJsConfig: resolveOwn(`${templatePath}/jsconfig.json`),
    yarnLockFile: resolveOwn(`${templatePath}/yarn.lock`),
    testsSetup: resolveModule(resolveOwn, `${templatePath}/src/setupTests`),
    proxySetup: resolveOwn(`${templatePath}/src/setupProxy.js`),
    appNodeModules: resolveOwn('node_modules'),
    publicUrlOrPath,
    // These properties only exist before ejecting:
    ownPath: resolveOwn('.'),
    ownNodeModules: resolveOwn('node_modules'),
    appTypeDeclarations: resolveOwn(`${templatePath}/src/react-app-env.d.ts`),
    ownTypeDeclarations: resolveOwn('lib/react-app.d.ts'),
};
```
对象属性均为项目中主要文件或文件夹所在绝对路径，是一个配置工具，而 react-app-rewired 在此基础上添加了自己的属性，感兴趣的话可自行查看源码。

### 增加 config/paths.js

如果我们想在 paths 的基础之上封装自己的属性，那么直接在 config/overrides.js 的 paths 上进行扩展是不行的，因为这时 config/overrides.js 的 webpack 中是无法读取这些参数的。因此单独增加 paths.js 进行集中配置, 并且在 overrides.js 的 paths 中直接引入并导出。

## 最终配置

```js
// config/paths.js
const path = require('path');
const paths = require('react-scripts/config/paths');

module.exports = Object.assign({}, paths, {
    jestConfig: path.resolve(__dirname, '../.jestrc.js'),
    proxySetup: path.resolve(__dirname, 'config/setupProxy.js')
});

```

```js
// .jestrc.js
const fs = require('fs');
const path = require('path');

const testSetup = path.resolve(__dirname, 'config/setupTests.js');

module.exports = {
    setupFilesAfterEnv: [fs.existsSync(testSetup) && testSetup].filter(Boolean),
    collectCoverageFrom: [
      '!src/*.{js,jsx,ts,tsx}',
      '!src/**/index.{js,jsx,ts,tsx}',
      '!src/config/*.{js,jsx,ts,tsx}',
    ],
}
```

```js
// config/setupTests.js
const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });
```

```js
// config/overrides.js
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const fs = require('fs');

const paths = require('./paths');

process.env.GENERATE_SOURCEMAP = 'false';
module.exports = {
    webpack: (config, env) => {
        const isEnvDevelopment = env === 'development';
        const isEnvProduction = env === 'production';
        const isAnalyzerEnable = process.env.ANALYZER_ENABLE === 'true';

        config.plugins.push(
            ...[
                isEnvProduction &&
                    new CompressionWebpackPlugin({
                        test: /\.(js|css|svg)$/,
                        threshold: 1024 * 5,
                    }),
                new ProgressBarPlugin(),
                isEnvProduction && isAnalyzerEnable && new BundleAnalyzerPlugin(),
            ].filter(Boolean)
        );

        config.resolve.alias = {
            ...config.resolve.alias,
            src: paths.appSrc
        }

        return config;
    },
    jest: config => {
        if (fs.existsSync(paths.jestConfig)) {
            const overrides = Object.assign({}, require(paths.jestConfig));
            Object.keys(overrides).forEach(key => {
                if (Array.isArray(config[key])) {
                    config[key].push(...overrides[key]);
                } else if (typeof config[key] === 'object') {
                    config[key] = Object.assign({}, config[key], overrides[key]);
                } else {
                    config[key] = overrides[key];
                }
            });
        }
        return config;
    },
    paths: (config, env) => {
        return paths;
    }
}

```






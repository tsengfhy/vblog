---
title: React 攒机之旅
date: 2020-08-10
categories:
- js
tags:
- react
---

## 前言

最近因工作需要，重新拾起了前端开发。
由于之前只接触过angular以及vue，这次需要使用react，在学习了一些文档资料后，为了加深理解决定自己攒个机玩玩。
针对这个工程，自己设计了一些目标特性。为了实现这些功能，同时还要继承CRA的版本迭代，对其进行了一定改造，并发现其中以及第三方插件的几个坑。
鉴于网上框架搭建的教程很多，这里只记录一些我认为比较有意思或者特别的点。

## 最终主要特性

- 扩展CRA
- 编码助手
- 模块化动态加载
- 伪微前端

## 项目结构效果图

```
├─ config
|  ├─ overrides.js
|  ├─ paths.js
|  └─ setupTests.js
├─ public
|  ├─ index.html
|  └─ favicon.ico
├─ src
|  ├─ config
|  |  ├─ store.js
|  |  └─ randomSuffix.js
|  ├─ utils
|  |  ├─ dynamicModule.js
|  |  └─ randomSuffix.js
|  ├─ views
|  └─ index.js
├─ .babelrc.js
├─ .browserslistrc
├─ .eslintrc.js
├─ .jestrc.js
├─ .stylelintrc.js
└─ package.json
```

## 目录

- [魔改CRA](react-framework-cra-extend.html)
- [编码助手](react-framework-code-helper.html)
- [模块化动态加载](react-framework-dynamic-module.html)
- [伪微前端](react-framework-pseudo-microfrontend.html)




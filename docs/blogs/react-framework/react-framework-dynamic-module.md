---
title: React 攒机之旅 --- 模块化动态加载
date: 2021-03-19
categories:
- js
tags:
- react
---

## 前言

最近很忙，忙于工作，忙于打游戏，也忙于烦心事，于是这一系列的后续文章耽搁了好久。

其实关于CRA的改动在之前的文章已经完结，而接下来的两篇是关于微前端的。
于我而言，我不是专业前端，也尚未涉足微前端框架，所以一直没想好后续文章该怎么写，怕即使写出来也只是纸上谈兵，更怕丢人……

在我学习react的过程中，始终有两个关键字萦绕耳畔。其中一个叫模块化，另一个叫渲染优化。而我今天要聊的就是模块化。

一切的一切在redux加入之前刚刚好，对于一个页面，我们可以将其无限分割，基于页面与逻辑也好，基于UI也好，无论怎样都好，最终呈现的都将是一个模块化的树状目录。
但是目录结构由于redux的加入改变巨大，我不得不添加actions和reducers目录，而如果只是目录的改变其实无所谓，有所谓的是，我不得不在另一个的地方去注册reducer，不论这些reducer我是否能用得上，这完全破坏了react模块化的初衷。

其实仔细想想，我们的action和reducer真的能做到那么高的代码重用吗，是不是很多时候都只是专门为某一个模块服务的。既然如此，暂且不提redux的必要性，那我们为什么不能将这部分代码也打包进模块中，使其随着模块进行懒加载呢？
经过不懈的面向搜索引擎，最终我找到了一个有意思的包，[redux-dynamic-modules](https://github.com/microsoft/redux-dynamic-modules)，它完美的实现了我的需求，于是我开心的用它封装了自己的工具。

以下，上代码。

## 核心代码

```js
// utils/dynamicModule.js
import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

export const formatReducer = (key, reducer) => ({
    id: key,
    reducerMap: { [key]: reducer },
});

export default (Component, reducerMap = {}) => props => (
    <DynamicModuleLoader
        modules={[
            ...Object.entries(reducerMap).map(([key, reducer]) => formatReducer(key, reducer)),
        ]}
    >
        <Component {...props} />
    </DynamicModuleLoader>
);
```

```js
// config/store.js
import { createStore } from 'redux-dynamic-modules';
import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { formatReducer } from '../utils/dynamicModule';
import reducers from '../reducers';

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const middlewares = [
    thunk,
    isEnvDevelopment && require('redux-immutable-state-invariant').default(),
].filter(Boolean);

const enhancers = [
    applyMiddleware(...middlewares),
    isEnvDevelopment && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
].filter(Boolean);

export default preloadedState =>
    createStore(
        {
            initialState: preloadedState,
            enhancers,
            advancedComposeEnhancers: compose,
        },
        ...Object.entries(reducers).map(([key, reducer]) => formatReducer(key, reducer))
    );
```

## Demo

```js
// Dashboard/index.js
import { dynamicModule } from 'src/utils';

import Dashboard from './Dashboard';
import { key, reducer } from './reducer';

export default dynamicModule(DashBoard, {
    [key]: reducer,
})
```



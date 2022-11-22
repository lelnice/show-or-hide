[![Latest Version on NPM](https://img.shields.io/npm/v/show-or-hide.svg?style=flat-square)](https://www.npmjs.com/package/show-or-hide)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

> show-or-hide 基于 Vue3 编写，他能够让你更加方便地控制元素的显示和隐藏。

# 目录

- [特点](#特点)
- [demo 演示](#demo演示)
- [安装](#安装)

## 特点

- 快速方便地控制元素的显示和隐藏。
- 提供开箱即用的点击外部区域则隐藏的功能。

## demo 演示

你可以访问 [demo 演示](https://lelnice.github.io/show-or-hide/)来更直观地了解其功能。

## 安装

npm 安装

```bash
npm install -S show-or-hide
```

pnpm

```bash
pnpm add -S show-or-hide
```

## 参数

| 名称        | 类型                    | 说明                                                                                      | 必传/可选 | 默认值    |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------- | --------- | --------- |
| triggerEle  | string\|HTMLElement     | 触发元素，用于控制另一个元素的显示/隐藏，最常见的场景是一个 button                        | 必传      | undefined |
| outsideFn   | (...args: any[]) => any | 当外部点击行为触发时，该方法将被调用                                                      | 可选      | undefined |
| selfControl | boolean                 | 自行控制，当该参数为 true 时，显示和隐藏将由调用人自行控制。因此传入的 triggerFn 将会失效 | 可选      | false     |
| reverse     | boolean                 | 是否可以反触发。比如当再次点击按钮时，是否可以关闭已打开的元素                            | 可选      | false     |
| outside     | boolean                 | 当触发行为超出被控制元素，是否触发。当为 true 时，可以传入 outsideFn 进行相应的操作       | 可选      | false     |
| triggerType | 'click'\|'mouseenter'   | 触发行为类型                                                                              | 可选      | click     |

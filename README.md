# common

> cango 组件库

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目结构
```
  |—— src
    |—— assets        ......  静态资源文件夹
    |—— components    ......  组件
    |—— directives    ......  vue相关指令
    |—— filters       ......  vue相关过滤器
    |—— minixs        ......  混合相关
    |—— utils         ......  工具包
    |—— themes        ......  样式
    |—— animations    ......  动画相关
    |—— lib           ......  依赖的第三方库
    |—— cgCommon.js   ......  组件库的出口（build 入口）
    |—— config.js     ......  组件库的配置文件
    |—— Constants.js  ......  常量库
    |—— main.js       ......  demo 主入口
    |—— App.vue       ......  demo 根组件
```
## 项目初始化

  进入项目根目录，执行 npm install 或 npm i 命令，安装相关依赖

## 项目构建

  1、组件库构建

  在项目根目录下执行 npm run build 命令，会在 根目录下的 dist 目录下生成 cg.js 文件 和 static/css/app.css 样式文件

  2、DEMO 构建

  在项目根目录下执行 npm run dev 命令，即可启动

## 使用方式

  现阶段仅支持 script 脚本引入的方式，在引入前需要依赖 vue.js，还需要引入 相关的css 文件
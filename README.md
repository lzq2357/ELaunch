# ELaunch [WIP]
## Intro
A launcher based on Electron and inspired by [UAfred](https://github.com/zhenyangze/uafred), now only support linux and MacOS.

## Download

see [release](https://github.com/zaaack/ELaunch/releases)



## config

> custom config path is `~/.ELaunch/config.js`

plugins in default config are built-in plugins, you can overwrite them or add new plugin in custom config(`~/.ELaunch/config.js`), see [default config](../app/config/config.default.js)


## Screen Captures

### Plugin app

![](https://raw.githubusercontent.com/zaaack/ELaunch/master/docs/captures/app.jpg)

### Plugin find

![](https://raw.githubusercontent.com/zaaack/ELaunch/master/docs/captures/find.jpg)


### Plugin websearch

![](https://raw.githubusercontent.com/zaaack/ELaunch/master/docs/captures/search.jpg)



### Plugin shell

#### node
![](https://raw.githubusercontent.com/zaaack/ELaunch/master/docs/captures/shell1.jpg)

#### iterm
![](https://raw.githubusercontent.com/zaaack/ELaunch/master/docs/captures/shell2.jpg)
![](https://raw.githubusercontent.com/zaaack/ELaunch/master/docs/captures/shell3.jpg)


### Plugin youdao

![](https://raw.githubusercontent.com/zaaack/ELaunch/master/docs/captures/youdao.jpg)

### Plugin calc

![](https://raw.githubusercontent.com/zaaack/ELaunch/master/docs/captures/calc.jpg)

## Plugin Develop

see [plugin.md](docs/plugin.md)

## Plan

[Dev Plan](https://github.com/zaaack/ELaunch/issues/1)


## Develop

You need install [nodejs](https://nodejs.org/en/) first, than run commands below
```sh
git clone https://github.com/zaaack/ELaunch.git
cd ELaunch
npm i
```
then you can start it by
```sh
npm start
```
or
```sh
npm i -g electron-prebuilt
electron ./index.js
```

## Build

see [electron-builder](https://github.com/electron-userland/electron-builder)

```js
npm run dist
```
## Welcome fork and contribute!

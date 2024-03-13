---
slug: solve-bundle-install-error-because-clang
title: 遇到 debase、ruby-debug-ide、libv8-node 不能正常安裝怎麼辦
description: 教你如何解決 debase、ruby-debug-ide、libv8-node 不能正常安裝的問題
authors: [junminhong]
tags: [debase, ruby-debug-ide, libv8-node, bundle, clang]
---

## 問題
今天遇到一個很神奇的問題, 如往常一樣執行
```bash
bundle install

# 如果想知道更詳細的bundle安裝細節可以多加--verbose
bundle install --verbose
``` 

發現, 有三個 gem 一直無法正常安裝
- debase
- ruby-debug-ide
- libv8-node

## 排查問題
於是排查了一下 log, 可以找到以下幾個關鍵字, 蠻明顯可以看出 complier 這塊可能出點問題, 那因為筆者是使用 macOS , 所以可以很快地聯想到應該是 `xcode command line tool`
```
note: expanded from macro 'rb_intern'
        __extension__ (RUBY_CONST_ID_CACHE((ID), (str))) : \
                                                       ^
15 warnings and 2 errors generated.
make: *** [debase_internals.o] Error 1

make failed, exit code 2
```

於是乎呢, 我就先重新安裝一下 `xcode command line tool` 看能不能解決這個問題, 如何重新安裝可以參考[這篇的步驟](https://library.wowkit.net/blog/page/2#macos-xcode-commandlinetools-%E6%80%8E%E9%BA%BC%E9%87%8D%E6%96%B0%E5%AE%89%E8%A3%9D)

但是事情並沒有想像中的這麼簡單...

## 那要怎麼解決呢?
到這邊各位可以稍微思考一下, 在透過 `bundler` 安裝這些 gem 的時候, 做了哪些事情, 這邊可以透過 `bundle install` 觀察一下有哪些負載很重的 `process`, 細心的各位其實可以看到 `clang` 這個東西此時會佔用蠻大量的CPU使用率

那也就是說可以把問題點收斂到這個區塊上, 首先可以先檢查自己電腦裡面的 `clang version`
```bash
clang -v

# get clang information
# 如果沒有透過Homebrew額外安裝llvm, 這邊應該會顯示的是xcode command line tool本身帶的
Homebrew clang version xx.x.x
Target: arm64-apple-darwin23.3.0 <= 會根據 macOS 不同
Thread model: posix
InstalledDir: xxx <= 安裝的位置
```

從取得的資訊裡面來看會發現我是使用 `Homebrew` 額外安裝的 `llvm`, 於是乎我就先 `llvm` 降版再重做一次 `bundle install`, 就發現 **竟 然 正 常 了**...

## 結語
其實在排查這個問題的時候, 就已經想到是不是前幾天有針對系統的一些東西有做個升級導致, 但排查到後的結果沒想到竟然是 `llvm` 在搞鬼, 原先更新完的版本是17, 降成16發現還是不行, 果斷繼續往下降就好了...

奉勸各位, ~~就算容易踩坑, 但新版還是要追起來😆~~, 沒事真的不要亂升級😭
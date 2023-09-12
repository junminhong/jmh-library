---
slug: mini-racer-bundle-failed
title: mini-racer gem install failed
authors: [junminhong]
tags: [rails, gem, mini-racer, libv8-node]
---
## 前言
最近在進行rails專案bundle install的時候, 發現有一個gem始終裝不起來。

這邊記錄一下排查思路以及解決方式

## 進入排查程序
當在做bundle install的時候遇到了這個錯誤訊息
![mini-racer-bundle-error](/blog_image/mini-racer-bundle-error.png)

於是乎呢！我就直接使用google大法把這段錯誤訊息貼上查詢, 不外乎就會得到一些解答

這邊列舉幾個issue有在討論這件事情

- [https://github.com/alshedivat/al-folio/issues/691](https://github.com/alshedivat/al-folio/issues/691)
- [https://github.com/rubyjs/mini_racer/issues/252](https://github.com/rubyjs/mini_racer/issues/252)
- [https://stackoverflow.com/questions/27875073/an-error-occurred-while-installing-libv8-3-16-14-7-and-bundler-cannot-continu](https://stackoverflow.com/questions/27875073/an-error-occurred-while-installing-libv8-3-16-14-7-and-bundler-cannot-continu)
- [https://medium.com/sudogem/rails-error-installing-libv8-with-native-extensions-or-could-not-find-therubyracer-4a332943f33d](https://medium.com/sudogem/rails-error-installing-libv8-with-native-extensions-or-could-not-find-therubyracer-4a332943f33d)

從幾個討論串中得知了幾種做法

#### 第一種做法
主要是透過自行安裝v8並在bundle的時候指定使用剛剛安裝好的v8
```bash 
# 透過homebrew安裝v8
brew install v8
# 然後指定bundle config
bundle config build.libv8 --with-system-v8

bundle install
```

#### 第二種做法
```bash
# 新增一個bundle lock 為ruby環境
bundle lock --add-platform ruby
```

以上做法都無法解決我的問題, 但由於呢始終沒有頭緒, 所以我只好重新安裝ruby

這邊我來介紹一下怎麼透過[rbenv](https://github.com/rbenv/rbenv)管理ruby

## 安裝好用的ruby管理器[rbenv](https://github.com/rbenv/rbenv)
```bash
# 透過brew安裝
brew install rbenv
# 安裝指定ruby版本
rbenv install 2.7.4
# 記得安裝一個新的ruby版本一定要執行這個指令
rbenv rehash
```
這樣就完成的ruby的安裝

## 繼續排查之路
當我重新安裝好ruby並重新bundle install的時候又發現還是出現一樣的問題

實在是走投無路的我只好乖乖的把bundle error log拿出來看看, 找看看有沒有什麼蛛絲馬跡

結果！似乎讓我找到了點東西
```bash
# 這邊有發現幾行的錯誤訊息, 看起來似乎跟macos自身帶的commandLineTools有關
No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

Node.js configure: Found Python 3.9.13...
WARNING: --openssl-no-asm will result in binaries that do not take advantage
         of modern CPU cryptographic instructions and will therefore be slower.
         Please refer to BUILDING.md
WARNING: warnings were emitted in the configure phase
```
當我看到了這個錯誤訊息後, 我就去試著找了一下macos本身的commandLineTools相關的資訊

接著我就試著重裝一下**xcode commandLineTools**, 果真就可以正常安裝了

## macos xcode commandLineTools 怎麼重新安裝
```bash
xcode-select -print-path
# 你會找到你的xcode commandLineTools裝在哪裡
# /Library/Developer/CommandLineTools

# 移除xcode commandLineTools
sudo rm -r /Library/Developer/CommandLineTools

# 重新安裝xcode commandLineTools
xcode-select --install

# Switch Xcode's path
sudo xcode-select -switch /Library/Developer/CommandLineTools

# Reset Xcode's path
sudo xcode-select --reset
```

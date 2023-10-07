---
slug: upgrade-ubuntu-nodejs-version
title: Ubuntu該如何升級node version
description: 想要在ubuntu上面部署node相關的專案時, 遇到版本不一致的情況要怎麼升級呢？別擔心, 趕緊來看看本篇文章吧
authors: [junminhong]
tags: [ubuntu, node, node.js, nvm]
---

## 前言
最近專案在使用[Capistrano](https://github.com/capistrano/capistrano)部署的時候, 發現機器上的node version比專案需求的還要低, 導致一直沒有辦法正常部署

升級的同時順便紀錄一下步驟, 以便免未來的我又忘記了😅

## 實作升級
> ubuntu 升級node version, 其實方法還蠻多的, 可以透過nvm或者PPA

### [nvm](https://github.com/nvm-sh/nvm)
蠻方便的一個node version manager tool, 但是在使用[Capistrano](https://github.com/capistrano/capistrano)部署的時候似乎沒有辦法正常吃到nvm的default `node.js`, 所以只好改用PPA來安裝以及更新node
#### 安裝
```bash
# 更新套件列表及版本資訊
sudo apt-get update

# 透過curl去抓install script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# 設定一下nvm環境變數
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# reload
source ~/.bashrc
source ~/.zshrc
```
#### 基本指令
```bash
# 查看目前可以被安裝的node version
nvm ls-remote

# install node.js
nvm install node

# list installed node version
nvm ls

# choose nvm version
nvm use node

# 設定node版本為default
nvm alias default node
```

### [PPA(Personal Package Archive)](https://launchpad.net/ubuntu/+ppas)
#### 什麼是PPA
PPA是一個私有的軟體包存儲庫, 允許開發者將他們開發或打包的軟體上傳到Launchpad（一個由Canonical Ltd. 提供的開發平台）, 從而讓所有Ubuntu用戶可以方便地安裝和更新

通常, 一個PPA包含一個或多個軟體包, 這些包可能是正式Ubuntu軟體庫中沒有的或者是更新版本的軟體

#### [nodesource](https://github.com/nodesource/distributions)
那我們要在ubuntu上面安裝`node.js`, 需要透過[nodesource](https://github.com/nodesource/distributions)
#### 安裝
```bash
# 更新套件列表及版本資訊
sudo apt-get update

# 安裝curl gnupg ca-certificates 套件
sudo apt-get install -y ca-certificates curl gnupg

# 製作apt key要放的資料夾
sudo mkdir -p /etc/apt/keyrings

# 製作gpg key並放到剛建立好的資料夾內
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# 安裝對應node version source list
# 假設今天想要安裝16, 那這邊就要設定16 
NODE_MAJOR=20
# 接著將source放進去nodesource.list檔案裡面
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# 再跑一次更新套件列表以及版本, 這邊會根據剛剛設定好的source去把對應的node.js version拉下來
sudo apt-get update

# 透過policy可以確認剛剛的設定是否成功, 可以看到相關訊息
apt policy nodejs

# 安裝node.js, 會自動幫你抓當前版本最新, 也就是說你剛剛設定16的話, 就會去幫你抓node.js 16最新的版本
sudo apt-get install nodejs -y
```
#### 解除安裝
```bash
apt-get purge nodejs &&\
rm -r /etc/apt/sources.list.d/nodesource.list &&\
rm -r /etc/apt/keyrings/nodesource.gpg
```
#### 舊版做法
```bash
# 更新yarn key
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
# 設定PPA為16版, 這個是舊版做法
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```

## 結論
> ‼️注意 [nodesource](https://github.com/nodesource/distributions)新版有在指令上有做調整

原本使用舊的作法一直遇到找不到相關`node.js`版本的問題, 花了一點時間在排查, 後面才發現指令上有做些調整😆
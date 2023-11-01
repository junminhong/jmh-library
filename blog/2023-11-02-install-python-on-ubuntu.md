---
slug: install-python-on-ubuntu
title: 如何在舊版ubuntu上安裝特定版本的python
description: 要如何在ubuntu16上安裝指定版本的python呢, 看這篇文章就對了
authors: [junminhong]
tags: [ubuntu, python, ubuntu16, make, install, tutorial, ppa]
---


## 為什麼需要安裝指定版的python
因為ubuntu16預設的python是3.5, 當今天需要安裝一些套件做編譯時, 會遇到版本過舊的問題

## 那要怎麼安裝呢？
### 方法一: PPA
```bash
# 更新安裝包列表
sudo apt-get update

# 安裝套件
sudo apt-get install software-properties-common

# 加入ppa:deadsnakes/ppa
add-apt-repository ppa:deadsnakes/ppa

# 更新安裝包列表
sudo apt-get update

# 直接透過apt-get安裝指定版本的python
sudo apt-get install python3.9
```

### 方法二: 自己的python自己編譯 😆
由於無法正常使用PPA直接安裝其他的python版本, 只好自己編譯了...

[python的原始碼可以在這邊下載](https://www.python.org/downloads/source/)

```bash
# 取得python3.9.18壓縮包
wget -c https://www.python.org/ftp/python/3.9.18/Python-3.9.18.tgz

# 解壓縮
tar -zxvf Python-3.9.18.tgz

# 進入資料夾
cd Python-3.9.18

# 配置編譯環境
./configure --prefix=/usr/local/bin/python@3.9.18

# 編譯
make

# 安裝
sudo make install

# link, 將原本系統的python3連接到先編譯好的python3.9.18上
sudo ln -sf /usr/local/bin/python@3.9.18/bin/python3 /usr/bin/python3

# 查看python 版本
python3 -V
```

## 奉勸
os版本還是要記得升級啊, 免得新套件很多東西都沒有辦法正常編譯😭
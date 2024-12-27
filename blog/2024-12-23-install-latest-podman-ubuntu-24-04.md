---
slug: install-latest-podman-ubuntu-24-04
title: Ubuntu 24.04 安裝最新版本的 Podman
description: 詳細介紹如何在 Ubuntu 24.04 上安裝最新版本的 Podman
authors: [junminhong]
keywords: [Podman, Quadlet, Ubuntu 24.04, Podman latest version, NetworkAlias feature, Podman installation, Linux container management, container technology]
tags: [Podman, Quadlet]
---

最近在導入 Podman，所以記錄一下安裝流程。

## 遇到的問題
預計透過 Podman 的 Quadlet 工具，使用 systemd 來管理 container，筆者覺得這個做法跟之前用 docker 的方式截然不同，在使用過後覺得蠻有趣的，以後會再針對這個工具寫篇文章來分享使用心得。

目前 Ubuntu 24.04 直接透過 apt 安裝的 Podman 版本會落在 4.9.3，但是我想使用的 NetworkAlias 是在 [v5.2.0](https://github.com/containers/podlet/issues/110) 才導入的。

為了使用這個功能，就需要安裝 Podman 的最新版本，於是乎整理了一篇來分享如何手動安裝最新版本的 Podman。

## Installation
接下來的安裝步驟會比較複雜些，盡量以未來還能看得懂的方式敘述。

### Install dependency
```bash
sudo apt-get update
```
```bash
sudo apt-get install make git gcc build-essential pkgconf libtool libsystemd-dev libprotobuf-c-dev libcap-dev libseccomp-dev libyajl-dev go-md2man autoconf python3 automake golang libgpgme-dev man conmon passt uidmap netavark
```
### Compile podman
```
git clone https://github.com/containers/podman.git
cd podman
git checkout v5.3.1
make
sudo make install
```
```bash
# show podman version
podman -v
```

### Compile crun
```bash
git clone https://github.com/containers/crun.git
cd crun
git checkout 1.19.1
./autogen.sh
./configure
make
sudo make install
```
```bash
# show crun version
crun -v
```

### Debug
```
# check podman detail information
podman info --debug
```

## 常見錯誤
- 如果遇到這種訊息，可以忽略它
```bash
troff:<standard input>:213: warning [p 4, 2.0i]: cannot adjust line
```
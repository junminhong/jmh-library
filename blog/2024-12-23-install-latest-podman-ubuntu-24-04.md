---
slug: install-latest-podman-ubuntu-24-04
title: Ubuntu 24.04 安裝最新版本的 Podman
description: 詳細介紹如何在 Ubuntu 24.04 上安裝最新版本的 Podman
authors: [junminhong]
keywords: [Podman, Quadlet, Ubuntu 24.04, Podman latest version, NetworkAlias feature, Podman installation, Linux container management, container technology]
tags: [Podman, Quadlet]
---

最近在導入 Podman，所以記錄一下安裝流程。

I'm importing Podman recently, so I'll record the installation process.

## 遇到的問題
預計透過 Podman 的 Quadlet 工具，使用 systemd 來管理 container，筆者覺得這個做法跟之前用 docker 的方式截然不同，在使用過後覺得蠻有趣的，以後會再針對這個工具寫篇文章來分享使用心得。

目前 Ubuntu 24.04 直接透過 apt 安裝的 Podman 版本會落在 4.9.3，但是我想使用的 NetworkAlias 是在 [v5.2.0](https://github.com/containers/podlet/issues/110) 才導入的。

為了使用這個功能，就需要安裝 Podman 的最新版本，於是乎整理了一篇來分享如何手動安裝最新版本的 Podman。

In the early stage, I reviewed Podman's Quadlet tool and used systemd to manage containers. The author felt that this approach was different from the previous method of using docker. After using it, I found it quite interesting. I will write an article about this tool to share my experience in the future.

Currently, the Podman version installed directly across apt in Ubuntu 24.04 will be 4.9.3, but the NetworkAlias ​​I want to use was imported only in [v5.2.0](https://github.com/containers/podlet/issues/110).

In order to use this feature, you need to install the latest version of Podman, so I compiled an article to share how to manually install the latest version of Podman.

## Installation
接下來的安裝步驟會比較複雜些，盡量以未來還能看得懂的方式敘述。

The next installation steps will be more complicated, so try to describe them in a way that can be understood later.

### Install dependency
```bash
sudo apt-get update
```
```bash
sudo apt-get install make git gcc build-essential pkgconf libtool libsystemd-dev libprotobuf-c-dev libcap-dev libseccomp-dev libyajl-dev go-md2man autoconf python3 automake golang libgpgme-dev man conmon passt uidmap netavark
```
### Compile podman
```bash
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

### add policy.json
```bash
vim ${HOME}/.config/containers/policy.json
{
  "default": [
    {
      "type": "insecureAcceptAnything"
    }
  ]
}
```

### Debug
```
# check podman detail information
podman info --debug
```

## 常見錯誤
- 如果遇到這種訊息，可以忽略它 (If you encounter this message, you can ignore it)
```bash
troff:<standard input>:213: warning [p 4, 2.0i]: cannot adjust line
```
- 假設你現在使用 Ubuntu 20.04、22.04，會需要安裝一些必要項目 (If you are using Ubuntu 20.04, 22.04, you will need to install some necessary items)
```bash
When building for 20.04 and 22.04, you will need to compile also conmon and the networking (netavark/aardvark-dns, passt)
```

**Translated with the help of Google Translate.**

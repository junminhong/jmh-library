---
slug: install-docker-compose-on-ubuntu
title: ubuntu如何安裝不同版本的docker-compose
description: 要如何在ubuntu16上安裝指定版本的docker-compose呢, 看這篇文章就對了
authors: [junminhong]
tags: [ubuntu, docker, docker-compose, install, tutorial]
---

## 簡單幾步驟, 立即享有不同版本的docker-compose 🚀
```bash
# 下載docker-compose
# version, 根據自己的需求調整
sudo curl -L "https://github.com/docker/compose/releases/download/${version}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 改變權限
sudo chmod +x /usr/local/bin/docker-compose

# 查看docker-compose版本
docker-compose -v
```
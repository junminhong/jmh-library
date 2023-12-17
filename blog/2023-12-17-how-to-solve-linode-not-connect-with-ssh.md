---
slug: solve-linode-not-connect-with-ssh
title: 緊急處理linode resize後無法透過ssh連線
authors: [junminhong]
tags: [linode, ssh, resize]
---

## 前情提要
最近因為有就職博覽會的關係, 所以要根據系統進行壓力測試, 以確保當天是能夠容納瞬時流量的

於是乎呢, 將系統硬體規格做個調整並搭配壓測, 先找出符合需求的硬體規格

## 炸彈即將來襲
當我完成測試後, 要將目前規格還原至原本的規格, 於是乎就直接按下`resize`後等待

![](/blog-image/how-to-solve-linode-not-connect-with-ssh/1.png)

### 於是過了一段時間後...
我看到了`RUNNING`, 想說應該就沒事了, 結果當我要去打開網站的時候, 完全無法使用

![](/blog-image/how-to-solve-linode-not-connect-with-ssh/2.png)

於是我趕緊透過ssh連到server看一下發生了什麼事情, 結果發現ssh完全連不上去

## 刺激的拆彈之旅
- 嘗試透過`reboot`, `power on\off`, 先確認能否解決問題, 發現並沒辦法解決
- 使用`linode`提供的`LISH console`, 嘗試進入機器, 發現完全無法進入, 也發現了幾個錯誤, 初步研判可能是`resize`的時候有些資料出現問題
  ![](/blog-image/how-to-solve-linode-not-connect-with-ssh/5.png)
- 這時候可以善用`linode`提供的緊急救援模式, 修復一下磁碟

  ![](/blog-image/how-to-solve-linode-not-connect-with-ssh/3.png)
  - 重新開機並透過ssh連線, 會發現現在透過Finnix成功進入系統
  ![](/blog-image/how-to-solve-linode-not-connect-with-ssh/4.png)
  ```bash
  # 看一下磁區
  dh -h

  # 如果沒有看到你的磁區才是正確的
  Filesystem      Size  Used Avail Use% Mounted on
  udev            1.9G     0  1.9G   0% /dev
  tmpfs           395M  516K  394M   1% /run
  /dev/sr0        503M  503M     0 100% /run/live/medium
  /dev/loop0      426M  426M     0 100% /run/live/rootfs/filesystem.squashfs
  tmpfs           2.0G   17M  2.0G   1% /run/live/overlay
  overlay         2.0G   17M  2.0G   1% /
  tmpfs           2.0G     0  2.0G   0% /dev/shm
  tmpfs           5.0M     0  5.0M   0% /run/lock
  tmpfs           4.0M     0  4.0M   0% /sys/fs/cgroup
  tmpfs           2.0G     0  2.0G   0% /tmp
  tmpfs           395M     0  395M   0% /run/user/0pressed_root
  unionfs         739M 1016K  738M   1% /
  devtmpfs         10M     0   10M   0% /dev
  ```
  - 使用`e2fsck`
  ```bash
  # 強制檢查, 然後有問題就直接選擇yes讓工具自己去修復
  e2fsck -f /dev/sda

  # 沒問題, 會出現這個訊息
  e2fsck 1.45.6 (20-Mar-2020)
  Pass 1: Checking inodes, blocks, and sizes
  Pass 2: Checking directory structure
  Pass 3: Checking directory connectivity
  Pass 4: Checking reference counts
  Pass 5: Checking group summary information
  /dev/sda: 44611/2564096 files (0.1% non-contiguous), 602550/10240000 blocks
  ```
- 修復後直接重新啟動就可以再次透過ssh進入系統, 此時再根據其他錯誤去做相對應的調整即可

## 反思時間
- 應該要先`clone`一起機器出來, 再搭配`transfer ip`直接切換機器即可, 不要再機器上面直接`resize`, 出事情會有點麻煩
- 做任何事情前一定要做備份, 但還好平常就有在備份的習慣, 所以其實最壞的結果就是直接透過備份`restore`在換上去就好了
- 扛著壓力, 將問題解決, 超讚的拉 😆
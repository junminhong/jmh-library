---
slug: linux-swap-setting
title: 機器記憶體不夠怎麼辦 - 善用swap
authors: [junminhong]
tags: [linux, swap, ram, tutorial, gce, google, google compute engine, aws, azure, ec2]
---

## 懶人包
```bash
# 使用fallocate 創建出一個4G的swapfile.1
sudo fallocate -l 4G /var/swapfile.1
# 更改檔案權限
sudo chmod 600 /var/swapfile.1
# 將檔案設置成swap file
sudo mkswap /var/swapfile.1
# 啟用記憶體交換空間
sudo swapon /var/swapfile.1
```
> 都出大事了, 還在慢慢看教學文章, 懶人包複製貼上, 直接搞定😆

## 先來個小劇場
原本都是用免費額度開一台不錯規格的GCE, 但最近在測試以最低成本也能夠運行服務, 所以將GCE規格改成「e2-micro」

當機器啟動完成後, 覺得服務應該都有正常開啟吧

所以我就下了一個魔法指令, 來看看目前的container是否都安好
```bash
docker ps
```
結果發現...怎麼有一個服務沒有被運行呢？然後想說手動重啟一下沒被運行的container

當開啟瀏覽器並打開服務後, 發現事情不是我想得這麼單純, 一直覺得奇怪怎麼無法連上呢？？？

然而我又回到GCE上再次輸入了神奇的指令後, 發現這次連docker運行資訊都不給我了, 整台機器直接當機！！

## 小劇場完來說說該如何解決吧
在小劇場中有提到多運行一個服務時會造成GCE當機, 經過多方面的排查後, 發現原來問題點出在記憶體身上
> 小訣竅！這邊可以使用這個指令去看每個container運行時大概會使用多少的記憶體
```bash
docker stats
```

因為「e2-micro」規格只有1G的記憶體, 但是其他服務已經將這個1G用的差不多了, 然而我又手動在啟動了一個服務

那這時候就會出現記憶體不足的現象導致整台GCE當機

## 解決方法
當確認完問題點後就來解決吧

這邊我會提供基本的兩個方法可以參考：
### 方法一 (土豪推薦)
如果你沒有任何的成本考量的話, 我非常建議你直接使用方法一, 你會省很多時間, 也是最簡單的解決方法😆

你只需要一個步驟, 將你的GCE的記憶體調大一點就可以輕鬆解決了 ~ 

### 方法二 (平民推薦)
練習時當然要學習控制成本以及將有限的資源最大化, 不然光機器成本就讓我月底吃土好像也不太對...

那方法二的解決思維就是透過比較便宜的硬碟去換取高價格的記憶體空間

因為我已經有將我的GCE空間調整至20G, 但其實我目前根本用不到這麼多, 但是因為硬碟只要往上加就沒辦法在往下調整了

所以我一直很煩惱到底要怎麼壓榨我剩餘的空間來達到成本最佳化

剛好遇到這個問題可以好好善用我閒餘的硬碟空間

#### 創建一個4G的swap file
由於我的空閒硬碟空間蠻大的, 所以我這邊直接創建一個4G的swap file出來, 主要還是要以你自身的情況去評估要開多少的虛擬記憶體
> 這邊提供個簡單的計算方法: 實體記憶體 * 2 = 虛擬記憶體

```bash
sudo fallocate -l 4G /var/swapfile.1
```

#### 設定檔案權限
為了安全性的問題, 這個檔案只能被root讀寫
```bash
sudo chmod 600 /var/swapfile.1
```

#### 將檔案設置為記憶體交換空間
```bash
sudo mkswap /var/swapfile.1
```

#### 啟用記憶體交換空間
```bash
sudo swapon /var/swapfile.1
```

#### 查看記憶體交換空間
```bash
swapon -s
```

#### 查看記憶體交換空間使用狀況
```bash
free -h
```

#### 查看更詳細的記憶體資訊, 其中也有包含交換空間的資料
```bash
grep -i swap /proc/meminfo
```

#### 設定開機自動掛載
```bash
vim /etc/fstab
# 加入這段
/swapfile swap swap defaults 0 0
```

#### 查看記憶體交換空間優先度
數值範圍為0-100, 預設數值60, 越靠近0表示越避免使用記憶體交換, 反之相反
```bash
cat /proc/sys/vm/swappiness
```

#### 修改記憶體交換空間優先度
```bash
sudo sysctl vm.swappiness=10
```

#### 永久更改記憶體交換空間優先度
```bash
vim /etc/sysctl.conf
# 加入這段
vm.swappiness=10
```

## 刪除記憶體交換空間檔案
```bash
# 停用記憶體交換空間
sudo swapoff -v /var/swapfile.1
# 刪除檔案
sudo rm /var/swapfile.1
```
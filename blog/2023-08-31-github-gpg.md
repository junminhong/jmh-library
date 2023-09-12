---
slug: github-gpg
title: Github GPG - 來為你的commit加個Verified吧
description: 透過GPG讓每個git commit都擁有屬於自己的簽名, 以防止有人盜用自己的名稱
authors: [junminhong]
tags: [github, gpg]
---
## 為什麼要安裝GPG

可以讓人家知道commit 是你本人所提交的

## 安裝[gnupg](https://gnupg.org/)

```bash
brew install gnupg
```

## 產生GPG keys

```bash
gpg --full-generate-key
```

```bash
# 這邊可以選擇你要使用哪一個金鑰種類
Please select what kind of key you want:
   (1) RSA and RSA
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
   (9) ECC (sign and encrypt) *default*
  (10) ECC (sign only)
  (14) Existing key from card

# 我這邊使用1 RSA and RSA

# 這邊可以輸入金鑰的長度
RSA keys may be between 1024 and 4096 bits long.
# 我這邊使用4096, 最高最強悍

# 這邊可以選擇你的金鑰要多久後過期
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
# 這邊為了省事, 我是直接選擇不過期

# 接著會要你填一些username and email之類的訊息, 就照實填寫
# 產生完成之後你會看到pub uid sub
```

## 提交剛剛產生好的公鑰到Github

```bash
# 可以使用這個指令顯示出所有包含公鑰與私鑰的GPG keys
gpg --list-secret-keys

# Fingerprint = sec 那一段複製起來
gpg --armor --export <Fingerprint>

# 你會拿到這段然後把這段貼到Github上
-----BEGIN PGP PUBLIC KEY BLOCK-----
key
-----END PGP PUBLIC KEY BLOCK-----
```

## Github

1. 進到Setting → SSH and GPG keys → 把剛剛那段GPG keys塞進來

## 接著來設定git

```bash
# 僅限此倉庫
git config user.signingkey Fingerprint

# 全域設定
git config --global user.signingkey Fingerprint

# 如果不想要每次commit都加-s可以用以下設定
# 僅限此倉庫
git config commit.gpgsign true

# 全域設定
git config --global commit.gpgsign true
```

## 故障排除

```bash
error: gpg failed to sign the data
fatal: failed to write commit object

# 執行這段檢查一下
echo "test" | gpg --clearsign

gpg: signing failed: Inappropriate ioctl for device
gpg: [stdin]: clear-sign failed: Inappropriate ioctl for device

# 解決方式, 加到.zshrc之類的環境變數裡面, 然後重讀一次設定檔即可
export GPG_TTY=$(tty)
```
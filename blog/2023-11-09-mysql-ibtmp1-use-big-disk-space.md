---
slug: mysql-ibtmp1-use-big-disk-space
title: MySQL突然佔用大量磁碟空間 - ibtmp1
description: MySQL ibtmp1突然佔用大量磁碟空間分析與處理
authors: [junminhong]
tags: [ubuntu, mysql, ibtmp1, disk space]
---

## 問題
最近突然收到機器disk space使用量已滿的通知, 並造成服務暫時性停擺

趕緊進入機器排查, 發現`mysql`使用的磁碟量非常高, 但以目前資料量來說是不成正比的

根據排查結果發現`mysql`裡面有一個檔案佔用磁碟容量非常多
```sql
--- 可以使用這串SQL query查出目前佔用容量最大的file, 可以發現ibtmp1 file容量非常大
SELECT FILE_NAME, FILE_TYPE, TABLESPACE_NAME, (TOTAL_EXTENTS * EXTENT_SIZE) / 1024 / 1024 / 1024 AS 'Current Size in GB'
FROM INFORMATION_SCHEMA.FILES
ORDER BY `total size(GB)` DESC;
```

## 找到問題後？
- 首先進到mysql.cnf裡面新增
```bash
# 根據自己的需求設定最大限制要多少容量, 這邊則先設定20G
innodb_temp_data_file_path = ibtmp1:12M:autoextend:max:20G
```
- 設定完成之後, 請將mysql進行重啟
```bash
# 重新啟動mysql service
sudo systemctl restart mysql.service
```
- 查看設定是否有正確套用
```sql
-- 可以使用這串SQL query確認剛剛的設定有正確被套用
SHOW VARIABLES LIKE '%innodb_temp_data_file_path%';

-- 要能夠看到這個設定, 才代表你剛剛設定的東西有被套用
ibtmp1:12M:autoextend:max:20G
```

## 為什麼會這樣？
由於預設情況下, `mysql`會創建12MB的臨時表空間, 當如果今天某個操作創建出了20MB的臨時表空間, 這時候會自動擴展至20MB, 會自動回收資料, 但擴展後佔用的磁碟空間則不會自動回復至12MB

那這個時候可以透過設定最大擴展size或者`重新啟動服務`解決無限擴展的問題

## 可以怎麼預防？
- 減少會使用到大空間臨時表的操作, 如: 複雜的查詢、排序、聯合查詢

## 參考資料
- [https://dev.mysql.com/doc/refman/5.7/en/innodb-temporary-tablespace.html](https://dev.mysql.com/doc/refman/5.7/en/innodb-temporary-tablespace.html)
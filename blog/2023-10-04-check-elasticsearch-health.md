---
slug: check-elasticsearch-health
title: 如何透過shell script監控Elasticsearch
description: 總是不知道elasticsearch節點是不是正常, 別擔心看完這篇文章也可以透過shell script做出簡單的monitor
authors: [junminhong]
tags: [elasticsearch, monitor, shell script, cluster health]
---

## 前言
最近一直收到`Elasticsearch`監控發出錯誤的訊息, 所以就來排查一下發生的什麼事, 同時順便優化了一下監控 🚧

## 實作
### 使用萬用的shell script
```bash
# elasticsearch_health_check.sh
#!/bin/bash

# Elasticsearch cluster URL
ES_URL="https://localhost:9200"

# call cluster health api, 非常推薦用這串參數
RESPONSE=$(curl -s -o response.txt -w "%{http_code}" --user username:password "${ES_URL}/_cluster/health?level=shards&wait_for_status=green&timeout=60s")

# Extract the cluster status, 這邊是用jq解析, 看個人喜好
STATUS=$(cat response.txt | jq -r .status)

# Logic to handle the status
if [ "$STATUS" == "green" ]; then
  # 節點綠燈時輸出的訊息
elif [ "$STATUS" == "yellow" ]; then
  # 節點黃燈時輸出的訊息
else
  # 節點出現嚴重錯誤時輸出的訊息
fi

if [ -n "$message" ]; then
  # 可以串接至個人使用的通訊軟體
fi
```

### cluster health api參數解釋
```bash
# api endpoint
_cluster/health

# 為什麼會設定level是shards呢？
# 監控顧名思義就是要在出現問題時, 要有相關紀錄可以排查問題, 所以一定是希望資訊越多越好
# 所以蠻推薦調整一下level
level=shards

# 等待節點狀態變成綠色
wait_for_status=green

# 預設30s, 建議可以調整一下
timeout=60s
```
### 搭配crontab
```bash
# 查看目前系統有哪些crontab
crontab -l

# 設定crontab
crontab -e

# 每十分鐘執行一次剛剛寫的shell script, 已達到定期檢查elasticsearch健康度的需求
*/10 * * * * elasticsearch_health_check.sh
```

## 結論
基本shell script可以再根據個人的需求調整相對應的邏輯, 就可以做出一個蠻好用的`elasticsearch`的監控了 

善用crontab ~~ 👍🏻

## 參考資料
- [https://www.elastic.co/guide/en/elasticsearch/reference/7.17/cluster-health.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/cluster-health.html)
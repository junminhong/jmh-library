---
slug: elasticsearch-not-found-ik-word
title: elasticsearch找不到ik_max_word的分詞器怎麼辦?
description: 一篇教你如何解決 Elasticsearch 無法找到 ik_max_word 分詞器的问题
authors: [junminhong]
tags: [elasticsearch, ik_max_word, synonym, es, not found]
---

## 問題
在使用 Elasticsearch 時, 如果某個 index 中的 field 有使用到 ik_max_word 分詞器, 但Elasticsearch 沒有安裝該 plugin, 就會出現以下訊息
```
Custom Analyzer [synonym] failed to find tokenizer under name [ik_max_word]"}
```

## 解決步驟
1. 進入elasticsearch container 
```
docker exec -it elasticsearch bash
```
2. 根據不同版本的elasticsearch下載對應的ik plugin
```
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.0/elasticsearch-analysis-ik-7.17.0.zip
```

## 參考網址
- [https://github.com/infinilabs/analysis-ik](https://github.com/infinilabs/analysis-ik)
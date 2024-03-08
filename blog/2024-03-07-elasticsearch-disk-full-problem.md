---
slug: elasticsearch-disk-full-problem
title: elasticsearch 出現 usage exceeded flood-stage watermark 怎麼辦呢
description: 一篇教你如何解決 elasticsearch 出現 usage exceeded flood-stage watermark 的問題
authors: [junminhong]
tags: [elasticsearch, watermark, disk, flood-stage, es]
---

## 問題
最近 elasticsearch 常常出現 watermark 已滿的問題, 這問題是因為硬碟空間不夠觸發了elasticsearch 的 watermark 的保護機制, 會先暫時將 index 鎖住不給寫入, 但此時是可以讀取的
```
TOO_MANY_REQUESTS/12/disk usage exceeded flood-stage watermark, index has read-only-allow-delete block
```

## 解決步驟
1. 優先將硬碟空間加大或者是清理空間, 可以善用 df、du 等指令去排查 disk space 並做清理
2. 設定 elasticsearch watermark, default 是95%
```
curl -X PUT --user es_account:password "https://elasticsearch_domain/_cluster/settings?pretty" -H 'Content-Type: application/json' -d'
{
  "persistent": {
    "cluster.routing.allocation.disk.watermark.low": 97%,
    "cluster.routing.allocation.disk.watermark.high": 97%,
    "cluster.routing.allocation.disk.watermark.flood_stage": 97%
  }
}
'
```
3. 設定完等 elasticsearch 沒問題時要將 watermark 設定移除
```
curl -X PUT --user es_account:password "https://elasticsearch_domain/_cluster/settings?pretty" -H 'Content-Type: application/json' -d'
{
  "persistent": {
    "cluster.routing.allocation.disk.watermark.low": null,
    "cluster.routing.allocation.disk.watermark.high": null,
    "cluster.routing.allocation.disk.watermark.flood_stage": null
  }
}
'
```

## 建議
- 善用 Grafana 等監控隨時注意機器的硬碟空間, 避免空間爆了造成index被鎖住
- 調整 index 的 lifecycle policy, 避免資料一直保存然後消耗過多的硬碟空間
- 機器硬碟空間蠻貴的, 可以考慮用某些服務的 block storage 有提供HDD的選項, 可以節省花費, 或者可以考慮往S3、GCS等有提供較便宜儲存方式的服務去放 cold data
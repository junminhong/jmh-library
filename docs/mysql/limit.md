---
slug: mysql-limit
title: "MySQL - LIMIT"
tags: ['mysql', 'database', 'limit', 'LIMIT', 'SQL', 'sql', 'query']
---
## 什麼是LIMIT
`LIMIT` 是 SQL 語言中的一個關鍵字, 用於指定從查詢結果中要返回的最大數量的行

它通常用於限制查詢結果的大小, 這在處理大量數據時非常有用


## 範例
```sql
INPUT:
SELECT name
FROM users;

OUTPUT:
|  name  |
|--------|
| Jasper |
| Family |
| David  |
| Alice  |
| Andy   |
| Sample |

INPUT:
SELECT name
FROM users 
LIMIT 3;

解釋: 利用LIMIT關鍵字限制查詢結果筆數

OUTPUT:
|  name  |
|--------|
| Jasper |
| Family |
| David  |
```

## LIMIT 和 OFFSET搭配
### 第一種用法
```sql
INPUT:
SELECT name
FROM users 
LIMIT 1, 3;

解釋: 跳過第一行, 返回接下來的三行

OUTPUT:
|  name  |
|--------|
| Family |
| David  |
| Alice  |
```
### 第二種用法
> 注意, 有些版本資料庫可能不支援這個語法

```sql
INPUT:
SELECT name
FROM users 
LIMIT 1 OFFSET 3;

解釋: 跳過第一行, 返回接下來的三行

OUTPUT:
|  name  |
|--------|
| Family |
| David  |
| Alice  |
```
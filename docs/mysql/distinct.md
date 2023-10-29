---
slug: mysql-distinct
title: "MySQL - DISTINCT"
tags: ['mysql', 'database', 'distinct', 'DISTINCT', 'SQL', 'sql', 'query']
---

## 什麼是DISTINCT
`DISTINCT` 是 SQL 語言中的一個關鍵字, 用來在查詢結果中去除重複的行

當你使用 `SELECT` 語句從一個或多個表中選擇數據時, 可能會得到重複的行, 使用 `DISTINCT` 可以確保查詢結果中的每一行都是唯一的

## 範例
```sql
INPUT:
SELECT name
FROM users;

OUTPUT:
|  name  |
|--------|
| Jasper |
| Jasper |
| Jasper |
| Jasper |
| Jasper |
| Sample |

INPUT:
SELECT DISTINCT name
FROM users;

解釋: 利用DISTINCT關鍵字告訴MySQL只回傳唯一的name行

OUTPUT:
|  name  |
|--------|
| Jasper |
| Sample |
```
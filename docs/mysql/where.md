---
slug: mysql-where
title: "MySQL - WHERE"
tags: ['mysql', 'database', 'where', 'WHERE', 'SQL', 'sql', 'query']
---

## 什麼是WHERE
`WHERE` 是 SQL 語句中的一個條件語句, 用來指定查詢或修改命令的條件, 以篩選出符合條件的數據

你可以使用 `WHERE` 語句來篩選查詢結果, 使其只包含符合特定條件的行

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
WHERE name='Jasper';

解釋: 使用where條件語法過濾我們想要的資料

OUTPUT:
|  name  |
|--------|
| Jasper |
```
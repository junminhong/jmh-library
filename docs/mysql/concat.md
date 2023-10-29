---
slug: mysql-concat
title: "MySQL - CONCAT"
tags: ['mysql', 'database', 'concat', 'CONCAT', 'SQL', 'sql', 'query']
---

## 什麼是CONCAT
`CONCAT` 是 SQL 中用於拼接兩個或多個字符串的函數

你可以使用它來組合來自不同列的數據或將靜態文本與列值結合

## 範例
```sql
INPUT:
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM users;

OUTPUT:
| first_name | last_name |
|------------|-----------|
| Nice       | Jasper    |
| Good       | Sample    |


INPUT:
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM users;

OUTPUT:
| full_name    |
|--------------|
| Nice Jasper  |
| Good Sample  |
```


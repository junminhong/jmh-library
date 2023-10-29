---
slug: mysql-union
title: "MySQL - UNION"
tags: ['mysql', 'database', 'union', 'UNION', 'SQL', 'sql', 'query']
---

## 什麼是UNION
`UNION` 是 SQL 中的一個操作符, 用於合併兩個或多個 `SELECT` 查詢的結果集, 並消除重複的行

## UNION
> 預設會幫你去除重複的行

```sql
SELECT name
FROM grades
UNION
SELECT name
FROM users

OUTPUT:
| name   |
|--------|
| Jasper |
| David  |
| Alice  |
```

## UNION ALL
> 如果你不想消除重複的行, 可以使用`UNION ALL`

```sql
SELECT name
FROM grades
UNION
SELECT name
FROM users

OUTPUT:
| name   |
|--------|
| Jasper |
| David  |
| Alice  |
| Jasper |
| David  |
| Alice  |
```
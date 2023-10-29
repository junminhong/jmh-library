---
slug: mysql-inner-join
title: "MySQL - INNER JOIN"
tags: ['mysql', 'database', 'inner join', 'INNER JOIN', 'SQL', 'sql', 'query']
---

## 什麼是INNER JOIN
SQL 中的 `INNER JOIN` 是一種常用的表連接操作, 它用於將兩個或多個表根據某些關聯條件結合起來, 以便能夠從這些表中檢索信息

`INNER JOIN` 會返回兩個表中所有匹配條件的行

## 範例
```sql
--- users table
| name   | email            | gender |
|--------|------------------|--------|
| Jasper | test01@gmail.com | female |
| David  | test02@gmail.com | male   |
| Alice  | test03@gmail.com | male   |

--- grades table
| name   | score  |
|--------|--------|
| Jasper | 200    |
| David  | 147    |
| Alice  | 162    |

INPUT:
SELECT *
FROM users
INNER JOIN grades
on users.name = grades.name

OUTPUT:
| name   | email            | gender | score |
|--------|------------------|--------|-------|
| Jasper | test01@gmail.com | female | 200   |
| David  | test02@gmail.com | male   | 147   |
| Alice  | test03@gmail.com | male   | 162   |
```
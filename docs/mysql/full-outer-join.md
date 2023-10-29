---
slug: mysql-full-outer-join
title: "MySQL - FULL OUTER JOIN"
tags: ['mysql', 'database', 'full outer join', 'FULL OUTER JOIN', 'SQL', 'sql', 'query']
---

## 什麼是FULL OUTER JOIN
SQL 中的 `FULL OUTER JOIN` 是一種表連接操作, 用於返回兩個表中的所有行

當兩個表中的行在連接條件上有匹配時, 就返回相應的列值；當沒有匹配時, 會在結果集中顯示 NULL 值

## 範例
```sql
--- users table
| name   | email            | gender |
|--------|------------------|--------|
| Jasper | test01@gmail.com | female |
| David  | test02@gmail.com | male   |
| Alice  | test03@gmail.com | male   |
| Family | test04@gmail.com | male   |

--- grades table
| name    | score  |
|---------|--------|
| Jasper  | 200    |
| David   | 147    |
| Alice   | 162    |
| Sample  | 123    |

INPUT:
SELECT *
FROM users
FULL JOIN grades
on users.name = grades.name

OUTPUT:
| name   | email            | gender | score |
|--------|------------------|--------|-------|
| Jasper | test01@gmail.com | female | 200   |
| David  | test02@gmail.com | male   | 147   |
| Alice  | test03@gmail.com | male   | 162   |
| Family | test04@gmail.com | male   | NULL  |
| NULL   | NULL             | NULL   | 123   |
```
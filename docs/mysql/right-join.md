---
slug: mysql-right-join
title: "MySQL - RIGHT JOIN"
tags: ['mysql', 'database', 'right join', 'RIGHT JOIN', 'SQL', 'sql', 'query']
---

## 什麼是RIGHT JOIN
SQL 中的 `RIGHT JOIN`（也稱為 `RIGHT OUTER JOIN`）是一種表連接操作, 用於返回右表（`RIGHT JOIN` 關鍵詞之後的表）的所有行, 以及左表（`RIGHT JOIN` 關鍵詞之前的表）中與右表匹配的行

如果右表中的某些行在左表中沒有匹配，那麼結果集中左表的部分將包含 NULL 值

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
| name   | score  |
|--------|--------|
| Jasper | 200    |
| David  | 147    |
| Alice  | 162    |
| Sample | 158    |

INPUT:
SELECT *
FROM users
RIGHT JOIN grades
on users.name = grades.name

OUTPUT:
| name   | email            | gender | score |
|--------|------------------|--------|-------|
| Jasper | test01@gmail.com | female | 200   |
| David  | test02@gmail.com | male   | 147   |
| Alice  | test03@gmail.com | male   | 162   |
| NULL   | NULL             | NULL   | 158   |
```
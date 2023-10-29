---
slug: mysql-left-join
title: "MySQL - LEFT JOIN"
tags: ['mysql', 'database', 'left join', 'LEFT JOIN', 'SQL', 'sql', 'query']
---

## 什麼是LEFT JOIN
SQL 中的 `LEFT JOIN`（也稱為 `LEFT OUTER JOIN`）是一種表連接操作, 用於返回左表（`LEFT JOIN` 關鍵詞之前的表）的所有行, 以及右表（`LEFT JOIN` 關鍵詞之後的表）中與左表匹配的行

如果左表中的某些行在右表中沒有匹配, 那麼結果集中右表的部分將包含 NULL 值

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

INPUT:
SELECT *
FROM users
LEFT JOIN grades
on users.name = grades.name

OUTPUT:
| name   | email            | gender | score |
|--------|------------------|--------|-------|
| Jasper | test01@gmail.com | female | 200   |
| David  | test02@gmail.com | male   | 147   |
| Alice  | test03@gmail.com | male   | 162   |
| Family | test04@gmail.com | male   | NULL  |
```
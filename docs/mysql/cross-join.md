---
slug: mysql-cross-join
title: "MySQL - CROSS JOIN"
tags: ['mysql', 'database', 'cross join', 'CROSS JOIN', 'SQL', 'sql', 'query']
---

## 什麼是CROSS JOIN
SQL 中的 `CROSS JOIN` 用於結合兩個表中的所有行, 也稱為笛卡爾積

如果第一個表包含 M 行, 第二個表包含 N 行, 則結果集將包含 M x N 行

CROSS JOIN 不需要任何條件來匹配行

## 範例
```sql
--- users table
| name   | email            | gender |
|--------|------------------|--------|
| Jasper | test01@gmail.com | female |
| David  | test02@gmail.com | male   |
| Alice  | test03@gmail.com | male   |

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
CROSS JOIN grades

OUTPUT:
| name   | email            | gender | score |
|--------|------------------|--------|-------|
| Jasper | test01@gmail.com | female | 200   |
| Jasper | test01@gmail.com | female | 147   |
| Jasper | test01@gmail.com | female | 162   |
| Jasper | test01@gmail.com | female | 123   |
| David  | test02@gmail.com | male   | 200   |
| David  | test02@gmail.com | male   | 147   |
| David  | test02@gmail.com | male   | 162   |
| David  | test02@gmail.com | male   | 123   |
| David  | test02@gmail.com | male   | 200   |
| Alice  | test03@gmail.com | male   | 200   |
| Alice  | test03@gmail.com | male   | 147   |
| Alice  | test03@gmail.com | male   | 162   |
| Alice  | test03@gmail.com | male   | 123   |
```
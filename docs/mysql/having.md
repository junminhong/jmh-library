---
slug: mysql-having
title: "MySQL - HAVING"
tags: ['mysql', 'database', 'having', 'HAVING', 'SQL', 'sql', 'query']
---

## 什麼是HAVING
`HAVING` 是 SQL 中用於指定對通過 `GROUP BY` 聚合的結果集進行過濾的條件的子句

它的作用類似於 `WHERE` 子句, 但 `WHERE` 過濾的是行, 而 `HAVING` 過濾的是聚合結果

## 範例
```sql
INPUT:
SELECT name, score
FROM grades

OUTPUT:
| name   | score  |
|--------|--------|
| Jasper | 100    |
| David  | 60     |
| Alice  | 64     |
| David  | 87     |
| Alice  | 98     |
| Jasper | 100    |

INPUT:
SELECT name, SUM(score)
FROM grades
GROUP BY name
HAVING SUM(score) > 150;

OUTPUT:
| name   | score  |
|--------|--------|
| Jasper | 200    |
| Alice  | 162    |
```
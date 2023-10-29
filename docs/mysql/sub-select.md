---
slug: mysql-sub-select
title: "MySQL - SUB SELECT"
tags: ['mysql', 'database', 'sub select', 'SUB SELECT', 'SQL', 'sql', 'query']
---

## 什麼是SUB SELECT

`SUB SELECT`, 也被稱為子查詢（Subquery）, 是指嵌套在另一個SQL查詢內的查詢

子查詢可以返回單個值、一列值或多列多行值, 並且可以在SELECT、FROM、或WHERE子句中使用

## 範例
```sql
--- product mouse table
| id | name    |
|----|---------|
| 1  | logic   |
| 2  | firefox |
| 3  | stone   |

--- product keyboard table
| id | name    |
|----|---------|
| 1  | chrome  |
| 2  | firefox |
| 3  | stone   |

INPUT:
SELECT name FROM mouse
WHERE name NOT IN 
(SELECT name FROM keyboard);

OUTPUT:
| id | name    |
|----|---------|
| 1  | logic   |
```
---
slug: mysql-in
title: "MySQL - IN"
tags: ['mysql', 'database', 'in', 'IN', 'SQL', 'sql', 'query']
---

## 什麼是IN
`IN` 是 SQL 中的一個條件運算符, 用來檢查某個值是否存在於一個值列表中

使用 `IN` 可以讓你在 WHERE 子句中指定多個可能的值, 並選擇匹配這些值中任意一個的所有行

## 範例
```sql
INPUT:
SELECT name, score
FROM grades
ORDER BY score;

OUTPUT:
| name   | score  |
|--------|--------|
| Jasper | 25     |
| David  | 60     |
| Alice  | 64     |
| Andy   | 77     |
| Family | 87     |
| Eric   | 98     |
| Amy    | 100    |


INPUT:
SELECT name, score
FROM grades
WHERE score IN (77, 87)

OUTPUT:
| name   | score  |
|--------|--------|
| Andy   | 77     |
| Family | 87     |
```
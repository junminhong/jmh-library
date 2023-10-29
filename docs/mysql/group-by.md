---
slug: mysql-group-by
title: "MySQL - GROUP BY"
tags: ['mysql', 'database', 'group by', 'GROUP BY', 'SQL', 'sql', 'query']
---

## 什麼是GROUP BY
`GROUP BY` 是 SQL 中用於將表中的多行數據分組的一個子句, 通常與聚合函數（如 COUNT(), SUM(), AVG(), MAX(), MIN() 等）一起使用, 以對每個組執行計算

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
GROUP BY name;

OUTPUT:
| name   | score  |
|--------|--------|
| Jasper | 200    |
| David  | 147    |
| Alice  | 162    |
```
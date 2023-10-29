---
slug: mysql-aggregate-function
title: "MySQL - 聚合函數"
tags: ['mysql', 'database', 'aggregate-function', 'aggregate', 'SQL', 'sql', 'query']
---

## 什麼是聚合函數
SQL 聚合函數（Aggregate Functions）是一類用來在多行數據上進行計算, 並返回單個值的函數

它們通常與 `GROUP BY` 子句一起使用來對一組行進行分組並計算每組的聚合值

## COUNT
> 計算行數

```sql
INPUT:
SELECT name
FROM users;

OUTPUT:
|  name  |
|--------|
| Jasper |
| Sample |

INPUT:
SELECT COUNT(*) 
FROM users;

OUTPUT:
| count |
|-------|
| 2     |
```

## SUM
> 計算某個column總合

```sql
INPUT:
SELECT score
FROM grades
ORDER BY score;

OUTPUT:
| score |
|-------|
| 25    |
| 60    |
| 64    |
| 77    |
| 87    |
| 98    |
| 100   |

INPUT:
SELECT SUM(score) 
FROM grades;

OUTPUT:
| SUM |
|-----|
| 511 |
```

## AVG
> 計算某個column平均值

```sql
INPUT:
SELECT score
FROM grades
ORDER BY score;

OUTPUT:
| score |
|-------|
| 25    |
| 60    |
| 64    |
| 77    |
| 87    |
| 98    |
| 100   |

INPUT:
SELECT AVG(score) 
FROM grades;

OUTPUT:
| AVG |
|-----|
| 73  |
```

## MAX
> 計算某個column最大值

```sql
INPUT:
SELECT score
FROM grades
ORDER BY score;

OUTPUT:
| score |
|-------|
| 25    |
| 60    |
| 64    |
| 77    |
| 87    |
| 98    |
| 100   |

INPUT:
SELECT MAX(score) 
FROM grades;

OUTPUT:
| MAX |
|-----|
| 100 |
```

## MIN
> 計算某個column最小值

```sql
INPUT:
SELECT score
FROM grades
ORDER BY score;

OUTPUT:
| score |
|-------|
| 25    |
| 60    |
| 64    |
| 77    |
| 87    |
| 98    |
| 100   |

INPUT:
SELECT MIN(score) 
FROM grades;

OUTPUT:
| MIN |
|-----|
| 25  |
```
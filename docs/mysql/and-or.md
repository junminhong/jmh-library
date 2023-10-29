---
slug: mysql-and-or
title: "MySQL - AND OR"
tags: ['mysql', 'database', 'and', 'or', 'SQL', 'sql', 'query']
---

## AND OR是什麼
在SQL中, `AND` 和 `OR` 是用來組合多個條件的邏輯運算符, 以過濾查詢結果

## AND
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
SELECT score
FROM grades
WHERE score < 80 AND score >=60 

OUTPUT:
| score |
|-------|
| 60    |
| 64    |
| 77    |
```

## OR
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
WHERE name=Amy OR score >= 64 

OUTPUT:
| name   | score  |
|--------|--------|
| Jasper | 25     |
| David  | 60     |
| Alice  | 64     |
| Amy    | 100    |
```


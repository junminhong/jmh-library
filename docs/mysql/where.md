---
slug: mysql-where
title: "MySQL - WHERE"
tags: ['mysql', 'database', 'where', 'WHERE', 'SQL', 'sql', 'query']
---

## 什麼是WHERE
`WHERE` 是 SQL 語句中的一個條件語句, 用來指定查詢或修改命令的條件, 以篩選出符合條件的數據

你可以使用 `WHERE` 語句來篩選查詢結果, 使其只包含符合特定條件的行

## 檢查單個值
```sql
INPUT:
SELECT name
FROM users;

OUTPUT:
|  name  |
|--------|
| Jasper |
| Family |
| David  |
| Alice  |
| Andy   |
| Sample |


INPUT:
SELECT name
FROM users
WHERE name='Jasper';

解釋: 使用where條件語法過濾我們想要的資料

OUTPUT:
|  name  |
|--------|
| Jasper |
```

## 不匹配檢查
```sql
INPUT:
SELECT name
FROM users
WHERE name<>'Jasper';

OUTPUT:
|  name  |
|--------|
| Family |
| David  |
| Alice  |
| Andy   |
| Sample |
```

## 範圍檢查
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
WHERE score BETWEEN 63 AND 70;
OUTPUT:
| score |
|-------|
| 64    |
```

## 空值檢查
```sql
INPUT:
SELECT id, name
FROM users;

OUTPUT:
| id  | name   |
|-----|--------|
| 1   | Jasper |
| 2   | Family |
| 3   | David  |
| 4   | Alice  |
| 5   | Andy   |
| 6   | NULL   |


INPUT:
SELECT name
FROM users
WHERE name IS NULL;

OUTPUT:
| id  | name   |
|-----|--------|
| 6   | NULL   |


INPUT:
SELECT name
FROM users
WHERE name IS NOT NULL;

OUTPUT:
| id  | name   |
|-----|--------|
| 1   | Jasper |
| 2   | Family |
| 3   | David  |
| 4   | Alice  |
| 5   | Andy   |
```
---
slug: mysql-insert-into
title: "MySQL - INSERT INTO"
tags: ['mysql', 'database', 'insert into', 'INSERT INTO', 'SQL', 'sql', 'query']
---

## 什麼是INSERT INTO
`INSERT INTO` 是 SQL 中用於將數據插入表中的語句

## 插入單一個數據
```sql
INPUT:
SELECT name
FROM users;

OUTPUT:
| name   |
|--------|
| Jasper |
| David  |
| Alice  |

INPUT:
INSERT INTO users 
VALUES ('Family')

OUTPUT:
| name   |
|--------|
| Jasper |
| David  |
| Alice  |
| Family |
```

## 插入多個數據
```sql
INPUT:
SELECT name
FROM users;

OUTPUT:
| name   |
|--------|
| Jasper |
| David  |
| Alice  |

INPUT:
INSERT INTO users (name)
VALUES ('Family'), ('Amy')

OUTPUT:
| name   |
|--------|
| Jasper |
| David  |
| Alice  |
| Family |
| Amy    | 
```
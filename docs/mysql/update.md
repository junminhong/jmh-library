---
slug: mysql-update
title: "MySQL - UPDATE"
tags: ['mysql', 'database', 'update', 'UPDATE', 'SQL', 'sql', 'query']
---

## 什麼是UPDATE
`UPDATE` 是 SQL 中的一個語句, 用於修改表中的現有數據

## 範例
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
UPDATE users SET name='Jasper good'
WHERE name='Jasper'

OUTPUT:
| name        |
|-------------|
| Jasper good |
| David       |
| Alice       |
```
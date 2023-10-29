---
slug: mysql-delete
title: "MySQL - DELETE"
tags: ['mysql', 'database', 'delete', 'DELETE', 'SQL', 'sql', 'query']
---

## 什麼是DELETE
`DELETE` 是 SQL 中用於刪除表中數據的語句

## 範例
> WHERE 條件式切記一定要加, 不然你會把所有的資料刪除...

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
DELETE FROM users
WHERE name='Jasper'

OUTPUT:
| name  |
|-------|
| David |
| Alice |
```

## 補充
如果你想要將整張表的資料刪除, 請不要使用`DELETE`, 善用`TRUNCATE`
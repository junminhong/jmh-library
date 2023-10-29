---
slug: mysql-like
title: "MySQL - LIKE"
tags: ['mysql', 'database', 'like', 'LIKE', 'SQL', 'sql', 'query']
---

## 什麼是LIKE
`LIKE` 是 SQL 中用來在 `WHERE` 子句中執行模糊匹配的運算符

它常常和通配符一起使用來搜尋具有相似模式的字符串

最常見的通配符是百分號 (%), 表示任意數量的字符, 和底線 (_), 表示任意單一字符。

- %: 代表0個, 1個, 或數個字母
- _: 代表剛好一個字母


## 範例
```sql
INPUT:
SELECT name
FROM users;

OUTPUT:
|  name        |
|--------------|
| Jasper       |
| Family       |
| DavidJasper  |
| Alice        |
| Andy         |
| Sample       |

INPUT:
SELECT name
FROM users
WHERE name LIKE '%er';

OUTPUT:
|  name        |
|--------------|
| Jasper       |
| DavidJasper  |

INPUT:
SELECT name
FROM users
WHERE name LIKE '%as%';

OUTPUT:
|  name        |
|--------------|
| Jasper       |
| DavidJasper  |
```
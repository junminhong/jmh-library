---
slug: mysql-ORDER-BY
title: "MySQL - ORDER BY"
tags: ['mysql', 'database', 'order by', 'ORDER BY', 'SQL', 'sql', 'query']
---

## 什麼是ORDER BY
`ORDER BY` 是 SQL 語言中用於排序查詢結果集的行的語句

它可以根據一個或多個列的值對結果進行排序, 並且可以指定升序（ASC）或降序（DESC）排序

## 範例
> 若未指定, 預設為ASC

```sql
INPUT:
SELECT score
FROM grades;

OUTPUT:
| score |
|-------|
| 87    |
| 64    |
| 100   |
| 98    |
| 77    |
| 25    |
| 60    |

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
ORDER BY score DESC;

OUTPUT:
| score |
|-------|
| 100   |
| 98    |
| 87    |
| 77    |
| 64    |
| 60    |
| 25    |
```
---
slug: mysql-truncate-table
title: "MySQL - TRUNCATE TABLE"
tags: ['mysql', 'database', 'truncate table', 'TRUNCATE TABLE', 'SQL', 'sql', 'query']
---

## 什麼是TRUNCATE TABLE
`TRUNCATE TABLE` 是 SQL 中用來刪除表中所有行的數據, 但不刪除表本身的語句

這個操作會快速地清空表中的所有數據, 並重設表的任何自動增量的主鍵

## 範例
```sql
TRUNCATE TABLE "table_name";
```
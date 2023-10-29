---
slug: mysql-select
title: "MySQL - SELECT"
tags: ['mysql', 'database', 'select', 'SELECT', 'SQL', 'sql', 'query']
---

## 什麼是SELECT
SELECT 是 SQL (Structured Query Language) 中用來從資料庫中檢索資料的一個指令

它允許你指定要檢索的列 (columns) 和要從哪個表 (table) 中檢索資料，還可以加入各種條件來過濾你需要的資料

## 檢索單個column
從簡單的SQL SELECT語句開始介紹
```sql
INPUT:
SELECT name
FROM users;

解釋: 利用SELECT語句從users table中搜尋一個名為name的column

OUTPUT:
|  name  |
|--------|
| Jasper |
| Sample |
```

## 檢索多個column
```sql
INPUT:
SELECT name, email, gender
FROM users;

解釋: 利用SELECT語句從users table中搜尋多個column

OUTPUT:
| name   | email            | gender |
|--------|------------------|--------|
| Jasper | test01@gmail.com | female |
| Sample | test02@gmail.com | male   |
```

## 檢索所有column
如果已知要搜尋哪種欄位資料時, 減少使用`*`來搜尋
```sql
INPUT:
SELECT *
FROM users;

解釋: 利用SELECT語句從users table中搜尋所有資料

OUTPUT:
| name   | email            | gender | phone      |
|--------|------------------|--------|------------|
| Jasper | test01@gmail.com | female | 0912345678 |
| Sample | test02@gmail.com | male   | 0987654321 |
```
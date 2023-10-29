---
slug: mysql-data-process-function
title: "MySQL - 數據處理函數"
tags: ['mysql', 'database', '數據處理函數', 'data-process-function', 'SQL', 'sql', 'query']
---

## 什麼是數據處理函數
SQL 數據處理函數是用來對表中的數據進行操作和轉換的一組內建函數

這些函數可以在 `SELECT` 語句、`UPDATE` 語句中的 `SET` 子句, 或者任何接受表達式的地方使用

## 字符串函數
### CONCAT(str1, str2, ...)
> 合併兩個或多個字符串

```sql
| id | name   | 
|----|--------|
| 1  | Jasper |

INPUT: 
SELECT CONCAT(id, '-', name) 
FROM users;

-- SQL Server 語法
SELECT id + '-' + name
FROM users;

-- Oracle 語法
SELECT id || '-' || name
FROM users;

OUTPUT:
| CONCAT(id, '-', name) |
|-----------------------|
| 1-Jasper              |
```

### LENGTH(str)
> 返回字符串的長度

```sql
| id | name   | 
|----|--------|
| 1  | Jasper |

INPUT: 
SELECT LENGTH(name)
FROM users;

OUTPUT:
| LENGTH(name) | 
|--------------|
| 6            |
```

### SUBSTRING(str, start, length)
> 從字符串中提取子串

```sql
| id | name   | 
|----|--------|
| 1  | Jasper |

INPUT: 
SELECT SUBSTRING(name, 2, 3)
FROM users
WHERE name='Jasper';

OUTPUT:
| SUBSTRING(name, 2, 3) | 
|-----------------------|
| asp                   |
```

### LOWER(str)
> 將字符串轉換為小寫

```sql
| id | name   | 
|----|--------|
| 1  | Jasper |

INPUT: 
SELECT LOWER(name)
FROM users
WHERE name='Jasper';

OUTPUT:
| LOWER(name)  | 
|--------------|
| jasper       |
```

### UPPER(str)
> 將字符串轉換為大寫

```sql
| id | name   | 
|----|--------|
| 1  | Jasper |

INPUT: 
SELECT UPPER(name, 2, 3)
FROM users
WHERE name='Jasper';

OUTPUT:
| UPPER(name)  | 
|--------------|
| JASPER       |
```

### TRIM(str)
> 刪除字符串兩端的空格

```sql
INPUT:
SELECT TRIM ('   Jasper      ')
OUTPUT:
'Jasper'

INPUT:
SELECT RTRIM ('   Jasper     ')
OUTPUT:
'   Jasper'

INPUT:
SELECT LTRIM ('   Jasper     ')
OUTPUT:
'Jasper     '
```

## 數字函數
### ROUND(number, decimals)
> 將數字四捨五入到指定的小數位數

```sql
| name   | score      |
|--------|------------|
| Jasper | 100.123    |
| David  | 60.36      |
| Alice  | 64.64      |

INPUT:
SELECT ROUND(score, 1) 
FROM grades;

OUTPUT:
| ROUND(score) |
|--------------|
| 100.1        |
| 60.4         |
| 64.6         |
```

### FLOOR(number)
> 返回小於或等於指定數字的最大整數

```sql
INPUT:
SELECT FLOOR(-13.2)

OUTPUT:
-14

INPUT:
SELECT FLOOR(13.2)

OUTPUT:
13
```

### CEIL(number)
> 返回大於或等於指定數字的最小整數

```sql
INPUT:
SELECT CEIL(-10.1);

OUTPUT:
-10

INPUT:
SELECT CEIL(10.1);

OUTPUT:
11
```

### ABS(number)
> 返回數字的絕對值

```sql
INPUT:
SELECT ABS(-10);

OUTPUT:
10

INPUT:
SELECT ABS(10);

OUTPUT:
10
```

## 日期和時間函數
### NOW()
> 返回當前日期和時間

```sql
INPUT:
SELECT NOW();

OUTPUT:
2023-10-29 19:18:00
```

### CURDATE()
> 返回當前日期

```sql
INPUT:
SELECT CURDATE();

OUTPUT:
2023-10-29
```

### CURTIME()
> 返回當前時間

```sql
INPUT:
SELECT CURTIME();

OUTPUT:
19:18:00
```

### DATE_ADD(date, INTERVAL expr unit)
> 將時間間隔加到日期

```sql
INPUT:
SELECT DATE_ADD('2023-10-29',INTERVAL 1 DAY);

OUTPUT:
2023-10-30

INPUT:
SELECT DATE_ADD('2023-10-29',INTERVAL 1 YEAR);

OUTPUT:
2024-10-29

INPUT:
SELECT DATE_ADD('2023-10-29',INTERVAL 1 MONTH);

OUTPUT:
2023-11-29

INPUT:
SELECT DATE_ADD('2023-10-29',INTERVAL 1 WEEK);

OUTPUT:
2023-11-05

INPUT:
SELECT DATE_ADD('2023-10-29',INTERVAL -1 WEEK);

OUTPUT:
2023-10-22
```


### DATEDIFF(date1, date2)
> 返回兩個日期之間的天數

```sql
INPUT:
SELECT DATEDIFF('2023-10-29', '2023-10-31');

OUTPUT:
-2
```

## 轉換函數
### CAST(value AS type)
> 將值轉換為指定類型

```sql
INPUT:
SELECT CAST(25.65 AS int);

OUTPUT:
25
```

### CONVERT(value, type) 
> 將值轉換為指定類型（在某些數據庫中）

```sql
INPUT:
SELECT CONVERT(int, 25.65);

OUTPUT:
25
```

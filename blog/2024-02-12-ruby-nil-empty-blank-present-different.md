---
slug: ruby-nil-empty-blank-present-different
title: 來探討Ruby on Rails世界中的nil? empty? blank? present?
description: 傻傻分不清楚的nil? empty? blank? present? 到底差在哪裡呢
authors: [junminhong]
tags: [ROR, rails, nil?, empty?, blank?, present?]
---
## nil?

- provided by ruby

- 可以使用在任何型別上

- 只有nil才會return true, 否則return false

```ruby
# 只有nil才會回傳true
nil.nil? => true

[].nil? => false
{}.nil? => false
0.nil? => false
false.nil? => false
"".nil? => false
" ".nil? => false
```

## empty?

- provided by ruby

- 僅用於 Hash、Array、Set、String

- 當沒有任何元素時才會return true, 否則return false

當你將`empty?` 使用在沒有該方法的類別上, 會得到`NoMethodError`的`exception`, 所以你會需要使用檢查來避免程式在運行上不會崩潰

```ruby
[].empty? => true
{}.empty? => true
Set.new.empty? => true
# 當用於string時, 可把他想像成bytes/characters的集合
"".empty? => true

" ".empty? => false
```

## blank?

- provided by rails(in ActiveSupport)

- 可以使用在任何型別上

- 任何false相關的情況都會回傳true, (如nil and false)

如同你所看到的, `blank?` 比 `empty?` 更好用, 可以避免無法使用的資料處理上, 會回傳`NoMethodErrors` 錯誤

```ruby
[].blank? => true
{}.blank? => true
Set.new.blank? => true
"".blank? => true
" ".blank? => true
false.blank? => true
nil.blank? => true

# 如果是Hash、Array、Set, 原理跟empty一樣, 如果沒有元素就回傳true
[nil].blank? => false
["", ""].blank? => false
{name: 'jasper'}.blank? => false
true.blank? => false
```

## present?

- provided by rails

- 跟`blank?`相反

```ruby

true.present? => true
{name: 'jasper'}.present? => true
3.present? => true

false.present? => false
{}.present? => false
"".present? => false
" ".presnet? => false
[].present? => false
nil.present? => false
```
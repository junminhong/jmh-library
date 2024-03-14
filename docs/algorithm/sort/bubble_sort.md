---
slug: bubble-sort
title: "[排序] 泡沫排序法"
tags: [bubble-sort, bubble, sort, algorithm, 泡沫排序法, 冒泡排序法]
---

## 泡沫排序法(冒泡排序法)
原理: 通過連續比較與交換鄰近元素實現排序

> 假設輸入有順序性的數組時, 最佳時間複雜度可為 O(n)

- 穩定排序
- 自適應排序
- 空間複雜度為 O(1)
- 時間複雜度為 O(n^2), 不管平均或最壞

```ruby
def bubble_sort(nums)
  pointer = 0
  while pointer < nums.size - 1
    sub_pointer = 0
    while sub_pointer < pointer
      # 當前元素小於比較元素就交換
      if nums[pointer] < nums[sub_pointer]
        # swap
        nums[sub_pointer], nums[sub_pointer + 1] = nums[sub_pointer + 1], nums[sub_pointer]
      end
      sub_pointer += 1
    end
    pointer += 1
  end
  return nums
end

puts bubble_sort([76, 98, 28, 51, 14, 44, 21, 13, 90, 97])
```

## 優化版 - 泡沫排序法
可以多加個 `flag`, 假設這輪沒有排序就直接退出該迴圈, 但時間複雜度不變

```ruby
def optimization_bubble_sort(nums)
  pointer = 0
  while pointer < nums.size - 1
    sub_pointer = 0
    flag = false
    while sub_pointer < pointer
      if nums[pointer] < nums[sub_pointer]
        nums[sub_pointer], nums[sub_pointer + 1] = nums[sub_pointer + 1], nums[sub_pointer]
        flag = true
      end

      # 這輪如果沒有排序就跳出該迴區
      break unless flag

      sub_pointer += 1
    end
    pointer += 1
  end
  return nums
end

puts optimization_bubble_sort([76, 98, 28, 51, 14, 44, 21, 13, 90, 97])
```

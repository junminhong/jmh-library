---
slug: selection-sort
title: "[排序] 選擇排序法"
tags: [selection-sort, selection, sort, algorithm, 選擇排序法]
---

## 選擇排序法
原理: 每一輪從未排序過的區間中選擇最小的元素, 將其放到已排序區間的最後

- 非穩定排序
- 非自適應排序
- 空間複雜度為 O(1)
- 時間複雜度為 O(n^2), 不管平均或最壞

```ruby
# 這個方法只專注在做一件事情, 那就是從區間內找到最小元素的pointer
def find_smallest_value_pointer(nums, pointer)
  smallest_pointer = pointer
  smallest_value = nums[pointer]

  while pointer < nums.size
    # 當如果當前元素小於目前最小值, 就將最小元素重新賦值
    if nums[pointer] < smallest_value
      smallest_value = nums[pointer]
      smallest_pointer = pointer
    end
    pointer += 1
  end

  return smallest_pointer
end


def selection_sort(nums)
  # 初始化 pointer 位置
  pointer = 0

  # loop
  while pointer < nums.size - 1
    # 找到未排序區間中最小元素的pointer
    smallest_pointer = find_smallest_value_pointer(nums, pointer)

    # swap
    nums[pointer], nums[smallest_pointer] = nums[smallest_pointer], nums[pointer]

    pointer += 1
  end
  return nums
end

puts selection_sort([76, 98, 28, 51, 14, 44, 21, 13, 90, 97])
```

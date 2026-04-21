---
title: Two Sum
slug: two-sum
difficulty: Easy
tags: [Array, HashMap]
companies: [Amazon, Google, Flipkart]
topic: Array
solved: true
date: 2024-01-15
---

## Problem

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

## Approach

Use a HashMap to store `value → index`. For each element, check if `target - num` already exists in the map.

- Time: O(n)
- Space: O(n)

## Solution

```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

## Notes

- Asked in Amazon SDE-2 interview round 1
- Edge case: same element can't be used twice

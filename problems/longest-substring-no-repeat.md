---
title: Longest Substring Without Repeating Characters
slug: longest-substring-no-repeat
difficulty: Medium
tags: [Sliding Window, HashMap, String]
companies: [Microsoft, Atlassian]
topic: String
solved: true
date: 2024-01-20
---

## Problem

Given a string `s`, find the length of the longest substring without repeating characters.

## Approach

Sliding window with a Set. Expand right pointer, shrink left when a duplicate is found.

- Time: O(n)
- Space: O(min(n, 26))

## Solution

```javascript
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, max = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    max = Math.max(max, right - left + 1);
  }

  return max;
}
```

## Notes

- Classic sliding window pattern
- Asked in Atlassian round 2 (with follow-up: return the actual substring)

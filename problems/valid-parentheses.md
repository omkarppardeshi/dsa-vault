---
title: Valid Parentheses
slug: valid-parentheses
difficulty: Easy
tags: [Stack, String]
companies: [Paytm, Razorpay]
topic: Stack
solved: true
date: 2024-02-01
---

## Problem

Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.

## Approach

Use a stack. Push opening brackets. On closing bracket, check if top of stack matches.

- Time: O(n)
- Space: O(n)

## Solution

```javascript
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const ch of s) {
    if (!map[ch]) {
      stack.push(ch);
    } else {
      if (stack.pop() !== map[ch]) return false;
    }
  }

  return stack.length === 0;
}
```

## Notes

- Paytm phone screen — asked within first 10 minutes
- Also verify empty string edge case → true

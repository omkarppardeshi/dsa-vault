---
title: Remove duplication from array
slug: remove-duplicate-from-array
difficulty: Easy
tags: [Stack, Array]
companies: [Rinovea]
topic: Stack
solved: true
date: 2026-04-18
---

## Problem

Given a array of number your job is to remove duplicate and print array.

## Approach

Use a stack. Push opening brackets. On closing bracket, check if top of stack matches.


## Solution

```javascript
const arr = [1,2,3,1,2,3,4,5,6]; //Input

let set = new Set();
const length = arr.length;


for(let i=0; i<length; i++ ){
   
   
        set.add(arr[i]);
   
}
console.log("New Array", set);
```

## Notes

- Asked in Rinovea interview

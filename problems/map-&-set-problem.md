---
title: "map & set problem"
topic: "Map & Set"
difficulty: "Easy - Medium"
tags: ["Map", "Set", "Frequency", "Two Pointer", "String", "Array"]
---

# Map & Set Problems

## Core Concepts

### When to use Map vs Set

| Situation | Use |
|-----------|-----|
| Count, frequency, how many times | `Map` |
| Duplicates, unique, already seen | `Set` |
| Group, associate, store pairs | `Map` |
| Fast existence check | `Set` |

### Map — Essential Methods
```js
const map = new Map();
map.set(key, value)      // add/update
map.get(key)             // retrieve
map.has(key)             // check → true/false
map.delete(key)          // remove
map.size                 // count
for (let [key, value] of map) { } // iterate
```

### Set — Essential Methods
```js
const set = new Set();
set.add(value)           // add
set.has(value)           // check → true/false
set.delete(value)        // remove
set.size                 // count
for (let value of set) { } // iterate

// Remove duplicates from array
const unique = [...new Set(arr)];
```

---

## Problems

---

### 1. Word Count
**Difficulty:** Easy  
**Pattern:** Frequency Map

**Problem:** Given a sentence, return a Map with each word as the key and its frequency as the value.

```
wordCount("the cat sat on the mat the cat")
→ Map { 'the' => 3, 'cat' => 2, 'sat' => 1, 'on' => 1, 'mat' => 1 }
```

**Solution:**
```js
function wordCount(str) {
    const map = new Map();

    for (let item of str.split(" ")) {
        if (map.has(item)) {
            map.set(item, map.get(item) + 1);
        } else {
            map.set(item, 1);
        }
    }

    return map;
}
```

**Key Insight:** `map.has()` → `map.get()` → `map.set()` is the standard frequency pattern.

---

### 2. First Non-Repeating Character
**Difficulty:** Easy  
**Pattern:** Frequency Map + Two Pass

**Problem:** Return the first character that appears only once. If none, return `null`.

```
firstNonRepeating("aabbcde") → "c"
firstNonRepeating("aabb")    → null
firstNonRepeating("abcd")    → "a"
```

**Solution:**
```js
function firstNonRepeating(str) {
    const map = new Map();

    for (let item of str) {
        if (map.has(item)) {
            map.set(item, map.get(item) + 1);
        } else {
            map.set(item, 1);
        }
    }

    for (let [key, value] of map) {
        if (value === 1) return key;
    }

    return null;
}
```

**Key Insight:** Two loops — first to count, second to find first with count `1`. Map maintains insertion order so the first match is guaranteed to be in original order.

---

### 3. Intersection of Arrays
**Difficulty:** Easy  
**Pattern:** Set Lookup

**Problem:** Return elements that appear in both arrays. No duplicates in output.

```
intersectionOfArrays([1, 2, 3, 4], [3, 4, 5, 6]) → [3, 4]
intersectionOfArrays([1, 1, 2, 3], [1, 2, 2, 4]) → [1, 2]
intersectionOfArrays([1, 2, 3], [4, 5, 6])       → []
```

**Solution:**
```js
function intersectionOfArrays(arr1, arr2) {
    const seen = new Set(arr1);
    const result = new Set();

    for (let item of arr2) {
        if (seen.has(item)) {
            result.add(item);
        }
    }

    return [...result];
}
```

**Key Insight:** `Set.has()` is O(1) vs `Array.includes()` which is O(n). Always prefer Set for lookups!

---

### 4. Two Sum
**Difficulty:** Easy  
**Pattern:** Map — Complement Lookup

**Problem:** Return the indices of two numbers that add up to the target.

```
twoSum([2, 7, 11, 15], 9) → [0, 1]
twoSum([3, 2, 4], 6)      → [1, 2]
```

**Solution:**
```js
function twoSum(arr, target) {
    const map = new Map();

    for (let [index, item] of arr.entries()) {
        const complement = target - item;
        if (map.has(complement)) {
            return [map.get(complement), index];
        }
        map.set(item, index);
    }

    return [];
}
```

**Key Insight:** Store `value → index` in the Map. For each number, check if its complement was already seen. This avoids O(n²) nested loops — single O(n) pass!

---

### 5. Longest Consecutive Sequence
**Difficulty:** Medium  
**Pattern:** Set — Start of Sequence Detection

**Problem:** Return the length of the longest consecutive sequence.

```
longestConsecutive([100, 4, 200, 1, 3, 2]) → 4  (1,2,3,4)
longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 1]) → 9
```

**Solution 1 — Sort (O(n log n)):**
```js
function longestConsecutive(arr) {
    const sorted = arr.sort((a, b) => a - b);
    let currentStreak = 1;
    let longestStreak = 1;

    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === sorted[i - 1] + 1) {
            currentStreak++;
        } else {
            currentStreak = 1;
        }
        longestStreak = Math.max(longestStreak, currentStreak);
    }

    return longestStreak;
}
```

**Solution 2 — Set (O(n)):**
```js
function longestConsecutive(arr) {
    const set = new Set(arr);
    let longestStreak = 0;

    for (let num of set) {
        if (!set.has(num - 1)) {         // only start from sequence beginning
            let currentStreak = 1;
            while (set.has(num + currentStreak)) {
                currentStreak++;
            }
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;
}
```

**Key Insight:** `!set.has(num - 1)` ensures we only start counting from the beginning of a sequence — avoids redundant work.

---

### 6. Is Anagram
**Difficulty:** Easy  
**Pattern:** Frequency Map Comparison

**Problem:** Return `true` if both strings are anagrams of each other.

```
isAnagram("listen", "silent") → true
isAnagram("hello", "world")   → false
isAnagram("rat", "tar")       → true
```

**Solution:**
```js
function isAnagram(str1, str2) {
    if (str1.length !== str2.length) return false;

    const map1 = new Map();
    const map2 = new Map();

    for (let item of str1) {
        map1.set(item, (map1.get(item) || 0) + 1);
    }

    for (let item of str2) {
        map2.set(item, (map2.get(item) || 0) + 1);
    }

    for (let [key, value] of map1) {
        if (map1.get(key) !== map2.get(key)) return false;
    }

    return true;
}
```

**Key Insight:** Length check first is a quick O(1) early exit. Then compare frequency Maps — if any character frequency differs, not an anagram.

---

## Bonus Problems (Practice)

### Find Duplicates
```js
function findDuplicates(arr) {
    const seen = new Set();
    const duplicates = new Set();

    for (let item of arr) {
        if (seen.has(item)) {
            duplicates.add(item);
        }
        seen.add(item);
    }

    return [...duplicates];
}
```

### Group By Frequency
```js
function groupByFrequency(arr) {
    const map = new Map();
    const result = {};

    for (let item of arr) {
        map.set(item, (map.get(item) || 0) + 1);
    }

    for (let [number, count] of map) {
        if (result.hasOwnProperty(count)) {
            result[count].push(number);
        } else {
            result[count] = [number];
        }
    }

    return result;
}
```

---

## Patterns Cheat Sheet

| Pattern | Template |
|---------|----------|
| Frequency count | `map.set(item, (map.get(item) \|\| 0) + 1)` |
| Deduplicate array | `[...new Set(arr)]` |
| Fast lookup | `set.has(value)` → O(1) |
| Store index | `map.set(value, index)` |
| Two pass | Build map → iterate original for order |
| Complement check | `target - current` → check in map |
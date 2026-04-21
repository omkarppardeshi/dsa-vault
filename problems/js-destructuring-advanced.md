---
title: JavaScript Destructuring - Advanced Q&A
slug: js-destructuring-advanced
difficulty: Medium
tags: [Destructuring, Array, Object, ES6, Rest, Nested]
companies: []
topic: JavaScript
solved: true
date: 2026-04-21
---

## Problem

Advanced destructuring scenarios covering nested objects, function parameters, rest operator, variable swapping, deep nesting, safe destructuring, and mixed array + object patterns.

## Solution

```javascript
// Q1: Nested + Default
const user = {
  name: "Omkar",
  address: {
    city: "Pune"
  }
};

// Extract name, city, and country (default = "India")
const { name, address: { city }, country = "India" } = user;

console.log(name);    // Omkar
console.log(city);    // Pune
console.log(country); // India


// Q2: Function Parameter Destructuring
const user2 = { name: "Omkar", age: 22 };

function printUser({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

printUser(user2); // Omkar is 22 years old


// Q3: Array + Rest
const numbers = [10, 20, 30, 40, 50];

const [first, second, ...rest] = numbers;

console.log(first);  // 10
console.log(second); // 20
console.log(rest);   // [30, 40, 50]


// Q4: Swap Variables
let a = 5;
let b = 10;

[a, b] = [b, a];

console.log(a); // 10
console.log(b); // 5


// Q5: Deep Nested Object
const data = {
  user: {
    profile: {
      username: "dev123",
      email: "dev@test.com"
    }
  }
};

const { user: { profile: { username, email } } } = data;

console.log(username); // dev123
console.log(email);    // dev@test.com


// Q6: Safe Destructuring (Avoid Crash)
const emptyUser = {};

// Without the = {} fallback, this would throw:
// Cannot destructure property 'city' of undefined
const { address: { city: safeCity = "Unknown" } = {} } = emptyUser;

console.log(safeCity); // Unknown


// Q7: Mixed Array + Object
const response = [
  { id: 1, name: "A" },
  { id: 2, name: "B" }
];

const [{ name: firstName }, { id: secondId }] = response;

console.log(firstName); // A
console.log(secondId);  // 2
```

## Notes

- **Q1**: `country` default won't work from inside `address` — it must be at the top level since `user.country` is what's being checked
- **Q3**: rest element `...rest` must always be last in the destructuring pattern
- **Q4**: swap with destructuring needs no temp variable — clean one-liner
- **Q5**: intermediate keys like `user:` and `profile:` are consumed and not available as variables after destructuring
- **Q6**: the `= {}` fallback on `address` is the key — without it, trying to destructure `city` from `undefined` throws a TypeError
- **Q7**: rename syntax works inside array destructuring too — `{ name: firstName }` renames `name` to `firstName`
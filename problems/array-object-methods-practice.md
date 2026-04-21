---

title: Array & Object Methods Practice
slug: array-object-methods-practice
difficulty: Easy-Medium
tags: [Array, map, filter, reduce, some, every]
companies: [General Frontend, React Interviews]
topic: JavaScript
solved: true
date: 2026-04-21
----------------

## Problem

Practice transforming and analyzing data using JavaScript array methods like `map`, `filter`, `reduce`, `some`, and `every`.

---

## Exercise 1

### Tasks:

* Get names of users above 18
* Check if all users are above 18
* Get total age of all users

```javascript
const users = [
  { name: "A", age: 17 },
  { name: "B", age: 22 },
  { name: "C", age: 25 }
];
```

### Solution

```javascript
const names = users
  .filter(u => u.age > 18)
  .map(u => u.name);

const isAllAbove18 = users.every(u => u.age > 18);

const totalAge = users.reduce((sum, u) => sum + u.age, 0);
```

---

## Exercise 2

### Tasks:

* Names of in-stock products
* Total price of in-stock products
* Check if any product is cheaper than 400

```javascript
const products = [
  { name: "Shirt", price: 500, inStock: true },
  { name: "Pant", price: 800, inStock: false },
  { name: "Shoes", price: 1500, inStock: true }
];
```

### Solution

```javascript
const inStockProducts = products
  .filter(p => p.inStock)
  .map(p => p.name);

const totalPrice = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);

const isCheap = products.some(p => p.price < 400);
```

---

## Exercise 3

### Tasks:

* Names of users with at least 1 purchase
* Total purchases of all users
* Check if any user has no purchases

```javascript
const users = [
  { name: "A", purchases: [100, 200] },
  { name: "B", purchases: [300] },
  { name: "C", purchases: [] }
];
```

### Solution

```javascript
const names = users
  .filter(u => u.purchases.length > 0)
  .map(u => u.name);

const totalPurchases = users.reduce(
  (sum, u) => sum + u.purchases.reduce((a, b) => a + b, 0),
  0
);

const hasNoPurchases = users.some(u => u.purchases.length === 0);
```

---

## Exercise 4

### Tasks:

* Total revenue (sum of all item prices)
* Orders which have at least 1 item
* IDs of orders with empty items

```javascript
const orders = [
  { id: 1, items: [{ price: 100 }, { price: 200 }] },
  { id: 2, items: [{ price: 300 }] },
  { id: 3, items: [] }
];
```

### Solution

```javascript
const totalRevenue = orders.reduce(
  (sum, o) => sum + o.items.reduce((a, b) => a + b.price, 0),
  0
);

const validOrders = orders.filter(o => o.items.length > 0);

const emptyOrderIds = orders
  .filter(o => o.items.length === 0)
  .map(o => o.id);
```

---

## Notes

* Always decide based on **output type**:

  * Array (same size) → `map`
  * Filtered array → `filter`
  * Single value → `reduce`
  * Boolean → `some` / `every`
  * Single match → `find`

* For nested arrays:

  * Use **nested `reduce`** or `flatMap`

* Avoid overusing methods—keep logic minimal and readable

* These patterns are heavily used in:

  * React apps
  * API data transformation
  * Frontend interviews

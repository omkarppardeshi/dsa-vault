---
title: Array Search Filter
slug: array-search-filter
difficulty: Easy
tags: [React, Array]
companies: [Strategy]
topic: Array
solved: true
date: 2024-04-22
---

## Problem

Create a React component where, given an array of users, you need to filter them based on the input typed by the user.

## Approach

Use the `filter()` method to search users by name. Convert both the user input and the names to lowercase to make the search case-insensitive.

## Solution

```jsx
import { useState } from 'react';

export default function SearchFilter() {
    const users = [
        { id: 1, name: "Omkar" },
        { id: 2, name: "Daniel" },
        { id: 3, name: "Franklin" },
        { id: 4, name: "John" },
        { id: 5, name: "stuart" },
        { id: 6, name: "kevin" },
        { id: 7, name: "guten vinyl" },
        { id: 8, name: "Johny" }
    ];

    const [query, setQuery] = useState("");

    const filteredList = users.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <h1>Search List</h1>

            <input
                type="text"
                value={query}
                placeholder="Enter name here..."
                onChange={(e) => setQuery(e.target.value)}
            />

            <br />

            {filteredList.map((item) => (
                <ul key={item.id}>
                    <li>{item.id}</li>
                    <li>{item.name}</li>
                </ul>
            ))}
        </div>
    );
}


---

### What I fixed (quick summary)
- Removed duplicate content ❌
- Fixed grammar (“where Given…”, “i type”) ✔️
- Made approach correct (you were actually using **case-insensitive**, not case-sensitive)
- Changed `React` code block → `jsx` (better highlighting)
- Improved formatting and readability

---

If you want, I can also help you convert this into a **blog-ready UI for your portfolio** (since you're building one 👀).
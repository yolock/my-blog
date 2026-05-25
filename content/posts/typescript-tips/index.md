---
title: "5 TypeScript Tips Every Developer Should Know"
date: "2026-05-15"
summary: "Practical TypeScript patterns and tips that will make your code safer, cleaner, and more maintainable."
tags: ["typescript", "javascript", "best-practices"]
published: true
featured: false
---

## 1. Use Discriminated Unions

Discriminated unions are one of TypeScript's most powerful features for modeling state:

```typescript
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: Error };

function handleState(state: State) {
  switch (state.status) {
    case "idle":
      // state is { status: "idle" }
      break;
    case "loading":
      // state is { status: "loading" }
      break;
    case "success":
      // state is { status: "success"; data: string[] }
      console.log(state.data);
      break;
    case "error":
      // state is { status: "error"; error: Error }
      console.error(state.error.message);
      break;
  }
}
```

## 2. The `satisfies` Operator

The `satisfies` operator (introduced in TypeScript 4.9) lets you validate types while preserving the narrowest possible inference:

```typescript
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<string, string | number[]>;

// palette.green is still inferred as string, not string | number[]
palette.green.toUpperCase(); // OK!
```

## 3. Template Literal Types

Template literal types let you create precise string patterns:

```typescript
type EventName = `on${Capitalize<string>}`;
// "onClick" | "onChange" | "onSubmit" | ...

type Padding = `p-${number}`;
// "p-0" | "p-1" | "p-2" | ...
```

## 4. The `noUncheckedIndexedAccess` Flag

Enable this compiler flag to make array and object access safer:

```typescript
// With noUncheckedIndexedAccess: true
const arr = [1, 2, 3];
const first = arr[0]; // type is number | undefined
const tenth = arr[9]; // type is number | undefined — correctly!
```

## 5. Const Assertions for Literal Types

Use `as const` to get the narrowest possible type:

```typescript
const colors = ["red", "green", "blue"] as const;
// type is readonly ["red", "green", "blue"]

type Color = (typeof colors)[number];
// "red" | "green" | "blue"
```

## Wrapping Up

TypeScript's type system is incredibly expressive. These five patterns will help you write safer, more self-documenting code. The key is to let the type system work for you — model your data accurately, and TypeScript will catch errors before they reach production.

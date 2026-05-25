---
title: "每个开发者都应该知道的 5 个 TypeScript 技巧"
date: "2026-05-15"
summary: "实用的 TypeScript 模式和技巧，让你的代码更安全、更清晰、更易于维护。"
tags: ["typescript", "javascript", "best-practices"]
published: true
featured: false
---

## 1. 使用可辨识联合类型

可辨识联合类型是 TypeScript 建模状态最强大的特性之一：

```typescript
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: Error };

function handleState(state: State) {
  switch (state.status) {
    case "idle":
      // state 的类型被收窄为 { status: "idle" }
      break;
    case "loading":
      // state 的类型被收窄为 { status: "loading" }
      break;
    case "success":
      // state 的类型被收窄为 { status: "success"; data: string[] }
      console.log(state.data);
      break;
    case "error":
      // state 的类型被收窄为 { status: "error"; error: Error }
      console.error(state.error.message);
      break;
  }
}
```

## 2. `satisfies` 操作符

`satisfies` 操作符（TypeScript 4.9 引入）可以在验证类型的同时保留最精确的类型推导：

```typescript
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<string, string | number[]>;

// palette.green 仍然推导为 string，而非 string | number[]
palette.green.toUpperCase(); // 没问题！
```

## 3. 模板字面量类型

模板字面量类型可以创建精确的字符串模式：

```typescript
type EventName = `on${Capitalize<string>}`;
// "onClick" | "onChange" | "onSubmit" | ...

type Padding = `p-${number}`;
// "p-0" | "p-1" | "p-2" | ...
```

## 4. `noUncheckedIndexedAccess` 编译选项

启用这个选项可以让数组和对象访问更安全：

```typescript
// noUncheckedIndexedAccess: true 时
const arr = [1, 2, 3];
const first = arr[0]; // 类型为 number | undefined
const tenth = arr[9]; // 类型为 number | undefined — 正确！
```

## 5. const 断言

使用 `as const` 获取最精确的类型：

```typescript
const colors = ["red", "green", "blue"] as const;
// 类型为 readonly ["red", "green", "blue"]

type Color = (typeof colors)[number];
// "red" | "green" | "blue"
```

## 总结

TypeScript 的类型系统表达力极强。以上五个模式能帮助你写出更安全、更自解释的代码。关键是让类型系统为你工作——准确建模数据，TypeScript 就能在生产环境之前帮你捕获错误。

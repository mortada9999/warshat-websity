---
name: mitosis
description: Builder.io's Mitosis framework. Write components once, compile to every framework (React, Vue, Qwik, Solid, Angular, Svelte, and more).
---

# Mitosis (by Builder.io)

This skill provides context on using `BuilderIO/mitosis`, an open-source tool that lets you write UI components once and compile them into native code for multiple frameworks.

## Core Concepts

1. **Write Once, Run Everywhere**: Write components using a subset of JSX and TypeScript (a syntax that closely resembles React and Solid). Mitosis compiles this generic source code into standard, idiomatic code for various frameworks.
2. **Supported Outputs**: Mitosis can generate code for React, Vue (2 & 3), Angular, Svelte, Solid, Qwik, Web Components, React Native, Swift, SwiftUI, and standard HTML/CSS.
3. **State and Lifecycle**: Mitosis uses specialized hooks like `useStore` (for reactive state) and `onMount`/`onUnMount` (for component lifecycles) which are smoothly mapped to the target framework's equivalent mechanisms (e.g., `useState`/`useEffect` in React, or `setup()` in Vue).

## Basic Syntax

A typical Mitosis component looks like this:

```tsx
import { useStore } from '@builder.io/mitosis';

export default function MyComponent(props: { name: string }) {
  const state = useStore({
    count: 0,
    increment() {
      state.count++;
    }
  });

  return (
    <div>
      <h1>Hello {props.name}!</h1>
      <button onClick={(event) => state.increment()}>
        Count: {state.count}
      </button>
    </div>
  );
}
```

## Workflow Integration
When generating or reading Mitosis code for this project:
- **Design Systems**: Mitosis is incredibly powerful for building universal Design Systems. If we create a UI library meant to be shared across a React and a Vue project, Mitosis is the perfect tool.
- **Styling**: Mitosis supports CSS-in-JS, inline styles, and external CSS. It compiles these styles into the native styling solution of the target framework (e.g., Vue's `<style scoped>`, React's `style={...}` or external CSS).
- **Code Generation Context**: Mitosis often works in tandem with Figma-to-Code plugins to generate raw UI code that can be imported anywhere.

## Best Practices
- Avoid using framework-specific idioms in Mitosis source code (e.g., avoid React's specific `useRef` nuances when a generic approach is needed). Stick to standard Mitosis hooks.
- Keep components small and focused to ensure clean compilation across all targets.

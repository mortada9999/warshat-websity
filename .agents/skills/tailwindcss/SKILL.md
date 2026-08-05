---
name: tailwindcss
description: >
  A utility-first CSS framework for rapidly building custom user interfaces. 
  This skill provides best practices, common patterns, and core concepts for 
  using Tailwind CSS efficiently. Activated for styling, UI development, and 
  configuring tailwind.config.js.
---

# Tailwind CSS Skill

This skill provides guidelines and best practices for developing with [Tailwind CSS](https://tailwindcss.com), a utility-first CSS framework.

**Source**: https://github.com/tailwindlabs/tailwindcss

## When to Use This Skill

- Building **responsive** and modern UI components.
- Configuring `tailwind.config.js` for custom themes, colors, and typography.
- Extracting components using `@apply` or JS component frameworks (React, Vue).
- Optimizing CSS for production.

---

## Core Concepts & Best Practices

### 1. Utility-First Workflow
Instead of writing custom CSS classes like `.btn-primary`, build designs by composing utility classes directly in your HTML/JSX:
```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```

### 2. Responsive Design
Tailwind uses a mobile-first breakpoint system. Unprefixed utilities take effect on all screen sizes, while prefixed utilities (like `md:`) take effect at the specified breakpoint and above.
- `sm:` (min-width: 640px)
- `md:` (min-width: 768px)
- `lg:` (min-width: 1024px)
- `xl:` (min-width: 1280px)
- `2xl:` (min-width: 1536px)

**Example:**
```html
<div class="w-full md:w-1/2 lg:w-1/3">...</div>
```

### 3. Hover, Focus, and Active States
Apply styling to interactive states using state modifiers.
**Example:**
```html
<button class="bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 active:bg-indigo-700 ...">
  Interactive Button
</button>
```

### 4. Dark Mode
Tailwind includes a `dark:` variant that lets you style your site differently when dark mode is enabled.
**Example:**
```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  Content adjusts to dark mode
</div>
```

---

## Configuration (`tailwind.config.js`)

Tailwind is highly customizable. You can define your color palette, fonts, and breakpoints in the configuration file.

### Extending the Default Theme
Always prefer `theme.extend` rather than overriding the `theme` object entirely (unless you specifically want to remove default values).

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#1da1f2',
        'brand-dark': '#0d8ecf',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

---

## Extracting Components

### Using Component Frameworks (Recommended)
If using React, Vue, or Angular, extract reusable components using the framework's native capabilities instead of CSS classes.

```jsx
// React Example
const Button = ({ children, variant = 'primary' }) => {
  const baseStyle = "font-bold py-2 px-4 rounded focus:outline-none focus:ring";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
};
```

### Using `@apply`
If you *must* write custom CSS (e.g., for global third-party library overrides), use the `@apply` directive. Note: Overusing `@apply` defeats the purpose of Tailwind.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}
```

---

## Tailwind CSS Directives

- `@tailwind base`: Injects Tailwind’s base styles and any base styles registered by plugins.
- `@tailwind components`: Injects Tailwind’s component classes and any component classes registered by plugins.
- `@tailwind utilities`: Injects Tailwind’s utility classes and any utility classes registered by plugins.
- `@layer`: Tells Tailwind which "bucket" a set of custom styles belongs to. Valid layers are `base`, `components`, and `utilities`.

---

## Production Optimization

Tailwind CSS v3+ features a Just-in-Time (JIT) engine enabled by default. It parses your templates (defined in the `content` array of `tailwind.config.js`) and generates only the CSS you actually use. 
- Ensure all paths in the `content` array are correct.
- Never dynamically construct class names (e.g., `class={"bg-" + color + "-500"}`). Tailwind cannot analyze this. Instead, map props to full class names or use complete class names in dynamic statements.

**Bad:**
```jsx
<div className={`text-${error ? 'red' : 'green'}-600`}>...</div>
```

**Good:**
```jsx
<div className={error ? 'text-red-600' : 'text-green-600'}>...</div>
```

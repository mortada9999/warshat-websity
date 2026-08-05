---
name: screenshot-to-code
description: A tool (abi/screenshot-to-code) that converts screenshots, mockups, and Figma designs into clean, functional code (HTML/Tailwind, React, Vue, etc.) using AI Vision models.
---

# Screenshot to Code

This skill provides context on `abi/screenshot-to-code`, an open-source tool that uses AI vision models (like Claude 3.5 Sonnet and GPT-4o) to convert images into code.

## Core Concepts

1. **AI-Powered Code Generation**: The tool takes a screenshot or a mockup image as input and outputs a pixel-perfect replication in code.
2. **Supported Frameworks**: It can generate code for HTML + Tailwind CSS, React, Vue, Bootstrap, Ionic, and Svelte.
3. **Iterative Updates**: It supports conversational updates. You can tell the AI to "make the button red" or "align the text to the right", and it will update the code accordingly.

## Workflow Integration
When incorporating generated code from "Screenshot to Code" into an existing codebase:
- **Refactoring**: The generated code often uses Tailwind CSS or inline styles. Refactor it to match the project's CSS architecture (e.g., converting Tailwind utilities to CSS Modules if the project uses Vanilla CSS/Modules).
- **Component Extraction**: Break down large generated UI files into smaller, reusable React/Vue components.
- **Asset Management**: Replace placeholder images or SVG icons with the project's actual local assets or SVGs.
- **Responsiveness**: Always verify and tweak the responsiveness of the generated code, as AI might occasionally miss mobile-first best practices.

## Best Practices
- **Clean Inputs**: High-resolution screenshots with clear UI boundaries produce the best code.
- **Review**: Always review the generated code for accessibility (a11y) standards, as AI tools might omit proper `aria-` attributes or semantic HTML tags.

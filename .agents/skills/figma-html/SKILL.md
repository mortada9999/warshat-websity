---
name: figma-html
description: Builder.io's Figma to HTML/React/Vue tool. Used to understand how to convert Figma designs into code or import websites into Figma using the Builder.io plugin.
---

# Figma to HTML (by Builder.io)

This skill provides context on how to use the `BuilderIO/figma-html` (or HTML to Figma) tools.

## Core Concepts

1. **Figma to Code**: You can convert Figma designs into clean, responsive HTML, CSS, React, Vue, Svelte, Solid, and more using the Builder.io Figma plugin.
2. **HTML to Figma**: You can capture any live webpage and import it directly into Figma as editable layers using the Builder.io Chrome extension.

## Workflow for converting Figma to Code:
1. Install the "Figma to HTML, React and more" plugin in Figma.
2. Select the layers/frames you want to export.
3. Run the plugin and select your desired output framework (e.g., React, HTML, Vue).
4. Copy the generated code and paste it into your project.
5. Review the code to ensure it matches your architecture (extracting components, adjusting CSS classes/modules).

## Best Practices
- Always ensure Figma layers use **Auto Layout** before exporting, as this generates the most accurate flexbox-based CSS/code.
- Name your layers properly in Figma; the plugin uses layer names to generate clean class names and variable names.
- After pasting the code, refactor it to fit the project's existing structure (e.g., moving inline styles to CSS modules, applying existing design tokens).

## Note
The original open-source repository for HTML-to-Figma has largely migrated to the official [Builder.io Chrome Extension](https://www.builder.io/c/docs/import-html-to-figma) and Figma plugin ecosystem. Always rely on the latest plugin versions in the Figma community.

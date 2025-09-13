---
description: Guidelines for creating and maintaining Github Copilot instructions to ensure consistency and effectiveness.
applyTo: '**'
---

- **Required Rule Structure:**

  ```markdown
  ---
  description: Clear, one-line description of what the rule enforces
  applyTo: "\*\*" # or 'path/to/files/\*.ext', 'other/path/\*\*/\*'
  ---

  - **Main Points in Bold**
    - Sub-points with details
    - Examples and explanations
  ```

- **File References:**
  - Use \`\[filename\]\(./relative/path/to/filename\)\` to reference files
  - Example: \`\[taskmaster.instructions.md\]\(./taskmaster.instructions.md\)\` for instructions references
  - Example: \`\[ContainerHandler.ts\]\(../../src/core/modules.ts\)\` for code references

- **Code Examples:**
  - Use language-specific code blocks

  ```typescript
  // ✅ DO: Show good examples
  const goodExample = true

  // ❌ DON'T: Show anti-patterns
  const badExample = false
  ```

- **Instructions Content Guidelines:**
  - Start with high-level overview
  - Include specific, actionable requirements
  - Show examples of correct implementation
  - Reference existing code when possible
  - Keep instructions DRY by referencing other instructions

- **Instructions Maintenance:**
  - Update instructions when new patterns emerge
  - Add examples from actual codebase
  - Remove outdated patterns
  - Cross-reference related instructions

- **Best Practices:**
  - Use bullet points for clarity
  - Keep descriptions concise
  - Include both DO and DON'T examples
  - Reference actual code over theoretical examples
  - Use consistent formatting across instructions

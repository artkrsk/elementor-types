---
description: Guidelines for continuously improving Github Copilot instructions based on emerging code patterns and best practices.
applyTo: '**'
---

- **Instructions Improvement Triggers:**
  - New code patterns not covered by existing instructions
  - Repeated similar implementations across files
  - Common error patterns that could be prevented
  - New libraries or tools being used consistently
  - Emerging best practices in the codebase

- **Analysis Process:**
  - Compare new code with existing instructions
  - Identify patterns that should be standardized
  - Look for references to external documentation
  - Check for consistent error handling patterns
  - Monitor test patterns and coverage

- **Instructions Updates:**
  - **Add New Instructions When:**
    - A new technology/pattern is used in 3+ files
    - Common bugs could be prevented by an instruction
    - Code reviews repeatedly mention the same feedback
    - New security or performance patterns emerge

  - **Modify Existing Instructions When:**
    - Better examples exist in the codebase
    - Additional edge cases are discovered
    - Related instructions have been updated
    - Implementation details have changed

- **Example Pattern Recognition:**

  ```typescript
  // If you see repeated patterns like:
  const data = await prisma.user.findMany({
    select: { id: true, email: true },
    where: { status: 'ACTIVE' }
  })

  // Consider adding to relevant instructions files:
  // - Standard select fields
  // - Common where conditions
  // - Performance optimization patterns
  ```

- **Instructions Quality Checks:**
  - Instructions should be actionable and specific
  - Examples should come from actual code
  - References should be up to date
  - Patterns should be consistently enforced

- **Continuous Improvement:**
  - Monitor code review comments
  - Track common development questions
  - Update instructions after major refactors
  - Add links to relevant documentation
  - Cross-reference related instructions

- **Instruction Deprecation:**
  - Mark outdated patterns as deprecated
  - Remove instructions that no longer apply
  - Update references to deprecated instructions
  - Document migration paths for old patterns

- **Documentation Updates:**
  - Keep examples synchronized with code
  - Update references to external docs
  - Maintain links between related instructions
  - Document breaking changes
  - Follow proper instruction formatting and structure guidelines

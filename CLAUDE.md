# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@arts/elementor-types`, a TypeScript definitions package for the Elementor WordPress page builder. It provides comprehensive type definitions for frontend handlers, editor interfaces, core modules, and utility functions.

## Commands

### Build and Development
- `pnpm run build` - Compile TypeScript to dist/ directory
- `pnpm run dev` - Watch mode compilation
- `pnpm run clean` - Remove dist/ directory
- `pnpm run type-check` - Type check without emitting files
- `pnpm run lint` - Run TypeScript strict mode type checking

### Package Management
- `pnpm run prepack` - Clean and build before publishing

## Architecture

### Module Organization
The package is organized into six main namespaces:

- **Core** (`src/core/`) - Base module system classes and interfaces
- **Frontend** (`src/frontend/`) - Frontend handlers, managers, and configurations
- **Editor** (`src/editor/`) - Editor components, controls, commands, and data system
- **Admin** (`src/admin/`) - Admin interface types
- **Utils** (`src/utils/`) - Utility types, helpers, guards, and advanced types
- **ThirdParty** (`src/third-party/`) - External library integrations (jQuery, Swiper, WordPress)
- **Globals** (`src/globals/`) - Global window declarations and module definitions

### Export Strategy
The package uses a dual export strategy:

1. **Namespace exports** - Grouped functionality to avoid naming conflicts
   ```typescript
   import type { Frontend, Editor, Core } from '@arts/elementor-types';
   ```

2. **Direct exports** - Commonly used types for convenience
   ```typescript
   import type { ElementorFrontend, ElementorEditor } from '@arts/elementor-types';
   ```

### Key Architectural Patterns

- **Module System**: Built on ViewModule base class from Core namespace
- **Handler System**: Frontend handlers extend Base class for element interactions
- **Command System**: Editor uses command pattern for actions
- **Type Guards**: Runtime type checking utilities in Utils namespace
- **Responsive Types**: Support for device-specific configurations

### Important Files

- `src/index.ts` - Main barrel export with documentation and usage examples
- `src/globals/window.ts` - Global window interface declarations
- `src/core/modules.ts` - Base module system definitions
- `src/frontend/handlers/base.ts` - Foundation handler classes
- `src/editor/main.ts` - Main editor interface definitions

## TypeScript Configuration

The project uses strict TypeScript settings:
- Target: ES2020
- Module: ESNext  
- Declaration generation enabled
- Strict mode enabled
- Excludes test files and tasks directory

## Dependencies

- **Peer Dependencies**: @types/jquery, swiper
- **Development**: TypeScript 5.2+, jQuery types, Swiper types
- No runtime dependencies (types-only package)

## Development Notes

- This is a types-only package with no runtime code
- All exports are type-only or declare statements
- Follows barrel export pattern for clean imports
- Uses namespace organization to prevent naming conflicts
- Includes comprehensive JSDoc documentation and usage examples

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md

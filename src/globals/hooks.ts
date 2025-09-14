/**
 * @deprecated Use the main ElementorHooks interface from src/editor/hooks.ts
 * This file is kept for backward compatibility and will be removed in future versions.
 */

// Re-export the consolidated interface
export type {
  ElementorHooks,
  ElementorActionHooks,
  ElementorFilterHooks,
  HookPriority,
  HookCallback,
  FilterCallback,
  ActionCallback
} from '../editor/hooks';
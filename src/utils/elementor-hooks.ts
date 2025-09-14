/**
 * @deprecated Use the main ElementorHooks interface from src/editor/hooks.ts
 * This file is kept for backward compatibility and will be removed in future versions.
 */

// Re-export the consolidated interface
export type {
  ElementorHooks,
  ElementorActionHooks,
  ElementorFilterHooks,
  HookCallback,
  FilterCallback,
  ActionCallback,
  HookPriority
} from '../editor/hooks';

// Import types for local usage
import type { ActionCallback, FilterCallback, ElementorHooks } from '../editor/hooks';

// Legacy type aliases for compatibility
export type ElementorActionCallback<T extends any[] = any[]> = ActionCallback<T>;
export type ElementorFilterCallback<TValue = any, TArgs extends any[] = any[]> = FilterCallback<TValue, TArgs>;

// Legacy interfaces (deprecated)
/** @deprecated */
export interface ElementorHookConfig {
  priority?: number;
  acceptedArgs?: number;
  context?: any;
  once?: boolean;
  namespace?: string;
}

/** @deprecated */
export interface ElementorHookHandler {
  callback: Function;
  priority: number;
  acceptedArgs: number;
  context?: any;
  namespace?: string;
  id: string;
}

// Legacy type guard (deprecated)
/** @deprecated Use isElementorHooks from editor/hooks instead */
export function isElementorHooks(obj: any): obj is ElementorHooks {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'addAction' in obj &&
    'doAction' in obj &&
    'addFilter' in obj &&
    'applyFilters' in obj &&
    typeof obj.addAction === 'function' &&
    typeof obj.doAction === 'function' &&
    typeof obj.addFilter === 'function' &&
    typeof obj.applyFilters === 'function'
  );
}
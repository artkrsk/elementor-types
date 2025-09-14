/**
 * Document Hooks System
 *
 * Export all document hook interfaces and types
 */

export * from './ui';
export * from './data';

// Re-export hook base types
export type { UIHook } from './ui';
export type { DataHook } from './data';
/**
 * Document Data Elements Hooks
 *
 * Export all document data elements hook interfaces and types
 */

// Element operation hooks
export * from './create';
export * from './delete';
export * from './move';
export * from './copy';
export * from './paste';
export * from './duplicate';
export * from './settings';

// Re-export commonly used base types
export type { DataHook } from './settings/handle-dynamic';
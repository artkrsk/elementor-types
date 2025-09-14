/**
 * Document System
 *
 * Export all document-related interfaces and types
 */

export * as UICommands from './ui/commands';
export * as GlobalsCommands from './globals/commands';
export * as DynamicCommands from './dynamic/commands';
export * as Elements from './elements';
export * as History from './history';
export * as Save from './save';
export * as Hooks from './hooks';
export * as UIStates from './ui-states';
export * as Repeater from './repeater';

// Re-export commonly used types
export type { UIHook } from './hooks/ui';
export type { DataHook } from './hooks/data';
export type { SaveDocument, FooterSaver } from './save';
export type { HistoryTransaction } from './history';
export type { UiStateBase } from './ui-states';
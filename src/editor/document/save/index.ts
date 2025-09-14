/**
 * Document Save System
 *
 * Export all document save interfaces and types
 */

export * from './commands';
export * from './component';
export * from './behaviors/footer-saver';

export { default as DocumentSaveComponent } from './component';
export { default as FooterSaver } from './behaviors/footer-saver';
export type { SaveDocument, FooterSaver as FooterSaverType } from './component';
/**
 * Selection Component
 * Types for element selection management
 */

/**
 * Selection mode types
 */
export type SelectionMode = "single" | "multiple" | "area" | "disabled";

/**
 * Selection event types
 */
export type SelectionEvent = "select" | "deselect" | "change" | "clear";

/**
 * Selectable element interface
 */
export interface SelectableElement {
  id: string;
  type: string;
  container?: any;
  element?: HTMLElement;
  model?: any;
  view?: any;
}

/**
 * Selection configuration
 */
export interface SelectionConfig {
  mode: SelectionMode;
  multiSelect: boolean;
  autoScroll: boolean;
  highlightSelected: boolean;
  allowDeselect: boolean;
}

/**
 * Selection manager interface
 */
export interface SelectionManager {
  config: SelectionConfig;

  // Selection operations
  select(element: SelectableElement): void;
  selectMultiple(elements: SelectableElement[]): void;
  deselect(element: SelectableElement): void;
  deselectAll(): void;
  toggle(element: SelectableElement): void;

  // Query operations
  getSelected(): SelectableElement[];
  getSelectedIds(): string[];
  isSelected(element: SelectableElement): boolean;
  hasSelection(): boolean;
  getSelectionCount(): number;

  // Mode management
  setMode(mode: SelectionMode): void;
  getMode(): SelectionMode;

  // Visual feedback
  highlightElement(element: SelectableElement): void;
  unhighlightElement(element: SelectableElement): void;
  showSelectionBounds(): void;
  hideSelectionBounds(): void;

  // Events
  onSelectionChange(callback: (selected: SelectableElement[]) => void): void;
  onElementSelect(callback: (element: SelectableElement) => void): void;
  onElementDeselect(callback: (element: SelectableElement) => void): void;

  // Utilities
  scrollToSelected(): void;
  focusSelected(): void;
  getSelectionBounds(): DOMRect | undefined;
}

/**
 * Editor History Manager
 * History, undo/redo functionality
 */

/**
 * History manager interface
 */
export interface HistoryManager {
  startHistoryTransaction(title: string): void;
  endHistoryTransaction(): void;
  doItem(index: number): void;
  undoItem(): void;
  redoItem(): void;
  getItems(): any[];
  getCurrentId(): number;
  navigate(to: boolean): void;
  canUndo(): boolean;
  canRedo(): boolean;
}

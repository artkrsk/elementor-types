/**
 * Editor UI Components
 * Panel, navigator, and other editor UI components
 */

/**
 * Main editor panel interface
 */
export interface Panel {
  storage: {
    get(key: string): any;
    set(key: string, value: any): void;
    remove(key: string): void;
  };

  getCurrentPageName(): string;
  getCurrentPageView(): any;
  setPage(page: string): void;
  changeTab(tab: string): void;
  blockUser(): void;
  unblockUser(): void;
  isOpen(): boolean;
  toggle(): void;
}

/**
 * Navigator component interface
 */
export interface Navigator {
  open(): void;
  close(): void;
  toggle(): void;
  isOpen(): boolean;
  setStructureCustomized(elementView: any): void;
  getIndicators(): any[];
  addIndicator(id: string, options: object): void;
}

/**
 * Responsive bar component interface
 */
export interface ResponsiveBar {
  currentDeviceMode: string;
  switchDevice(device: string): void;
  getDevices(): string[];
  getActiveBreakpoint(): string;
  getDevicesList(): object[];
}

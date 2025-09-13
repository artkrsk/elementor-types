/**
 * Menu Handler Module Types
 * Types for admin menu management
 */

export interface MenuConfig {
  items: MenuItem[];
  capabilities: {
    [item: string]: string;
  };
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  capability: string;
  icon?: string;
  badge?: {
    text: string;
    color: string;
  };
  submenu?: MenuItem[];
}

export interface MenuHandler {
  config: MenuConfig;

  // Menu management
  addMenuItem(item: MenuItem): void;
  removeMenuItem(id: string): void;
  updateMenuItem(id: string, updates: Partial<MenuItem>): void;

  // Access control
  canAccessMenuItem(id: string, userCapabilities: string[]): boolean;
  filterMenuByCapabilities(userCapabilities: string[]): MenuItem[];

  // Badge management
  setBadge(itemId: string, text: string, color?: string): void;
  removeBadge(itemId: string): void;
}

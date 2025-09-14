/**
 * Settings Component
 * Types for editor settings management
 */

/**
 * Setting types
 */
export type SettingType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "color"
  | "image"
  | "url"
  | "code";

/**
 * Setting definition interface
 */
export interface SettingDefinition {
  name: string;
  label: string;
  type: SettingType;
  default?: any;
  options?: { [key: string]: string };
  description?: string;
  conditions?: any;
  tab?: string;
  section?: string;
  pro_required?: boolean;
}

/**
 * Settings configuration
 */
export interface SettingsConfig {
  tabs: {
    [tab: string]: {
      title: string;
      icon?: string;
      sections: {
        [section: string]: {
          title: string;
          settings: SettingDefinition[];
        };
      };
    };
  };
}

/**
 * Settings manager interface
 */
export interface SettingsManager {
  config: SettingsConfig;

  // Setting operations
  getSetting(name: string): any;
  setSetting(name: string, value: any): void;
  getSettings(): Record<string, any>;
  setSettings(settings: Record<string, any>): void;
  resetSetting(name: string): void;
  resetAllSettings(): void;

  // Definition management
  registerSetting(definition: SettingDefinition): void;
  unregisterSetting(name: string): void;
  getSettingDefinition(name: string): SettingDefinition | undefined;

  // Validation
  validateSetting(name: string, value: any): boolean;
  getValidationErrors(): { [setting: string]: string[] };

  // Import/Export
  exportSettings(): string;
  importSettings(data: string): boolean;

  // Events
  onSettingChange(callback: (name: string, value: any) => void): void;
  onSettingsChange(callback: (settings: any) => void): void;
}

/**
 * Settings modal interface
 */
export interface SettingsModal {
  show(tab?: string): void;
  hide(): void;
  isVisible(): boolean;

  setTab(tab: string): void;
  getTab(): string;

  onSave(callback: () => void): void;
  onCancel(callback: () => void): void;
}

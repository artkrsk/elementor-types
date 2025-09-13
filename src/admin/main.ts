/**
 * Main Admin Interface
 * Core admin functionality and configuration
 */

/**
 * Admin configuration interface
 */
export interface ElementorAdminConfig {
  version: string;
  adminUrl: string;
  nonce: string;
  beta_tester: {
    option_enabled: boolean;
    signup_dismissed: boolean;
  };
  elementor_pro: {
    active: boolean;
    license: {
      status: string;
      key?: string;
    };
  };
  maintenance_mode: {
    enabled: boolean;
    exclude_mode: string;
    exclude_roles: string[];
  };
  experiments: {
    [key: string]: boolean;
  };
  settings: {
    [page: string]: {
      [setting: string]: any;
    };
  };
}

/**
 * Admin elements interface
 */
export interface AdminElements {
  $switchMode: JQuery<HTMLElement>;
  $goToEditLink: JQuery<HTMLElement>;
  $switchModeInput: JQuery<HTMLElement>;
  $switchModeButton: JQuery<HTMLElement>;
  $elementorLoader: JQuery<HTMLElement>;
  $builderEditor: JQuery<HTMLElement>;
  $importButton: JQuery<HTMLElement>;
  $importNowButton: JQuery<HTMLElement>;
  $importArea: JQuery<HTMLElement>;
  $importForm: JQuery<HTMLElement>;
  $importFormFileInput: JQuery<HTMLElement>;
  $settingsForm: JQuery<HTMLElement>;
  $settingsTabsWrapper: JQuery<HTMLElement>;
  $settingsFormPages: JQuery<HTMLElement>;
  $activeSettingsPage: JQuery<HTMLElement>;
  $settingsTabs: JQuery<HTMLElement>;
  $activeSettingsTab: JQuery<HTMLElement>;
  $menuGetHelpLink: JQuery<HTMLElement>;
  $menuGoProLink: JQuery<HTMLElement>;
  $reMigrateGlobalsButton: JQuery<HTMLElement>;
}

/**
 * Main Elementor Admin interface
 */
export interface ElementorAdmin {
  config: ElementorAdminConfig;
  maintenanceMode: any;

  // Element management
  getDefaultElements(): AdminElements;
  elements: AdminElements;

  // Mode management
  toggleStatus(): void;
  isElementorMode(): boolean;
  setFlagEditorChange(status: boolean): void;

  // Settings management
  setSettings(key: string, value: any): void;
  getSettings(key?: string): any;

  // Template management
  onImportTemplate(): void;
  onImportTemplateFromLibrary(templateData: any): void;
  importTemplate(templateData: any): void;

  // Settings pages
  onSettingsTabClick(event: Event): void;
  onSettingsFormSubmit(event: Event): void;

  // Utilities
  openPrevious(): void;
  goToPrevious(): void;
  enableMaintenanceMode(): void;
  disableMaintenanceMode(): void;

  // Event handling
  bindEvents(): void;
  onInit(): void;
}

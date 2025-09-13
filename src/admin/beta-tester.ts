/**
 * Beta Tester Module Types
 * Types for Elementor beta testing functionality
 */

/**
 * Beta tester configuration
 */
export interface BetaTesterConfig {
  option_enabled: boolean;
  signup_dismissed: boolean;
  beta_version?: string;
  stable_version?: string;
  features: string[];
}

/**
 * Beta tester settings
 */
export interface BetaTesterSettings {
  selectors: {
    betaTesterFirstToKnow: string;
    dismissButton: string;
    signupForm: string;
  };
}

/**
 * Beta tester elements
 */
export interface BetaTesterElements {
  $betaTesterFirstToKnow: JQuery<HTMLElement>;
  $dismissButton?: JQuery<HTMLElement>;
  $signupForm?: JQuery<HTMLElement>;
}

/**
 * Beta tester layout interface
 */
export interface BetaTesterLayout {
  // Modal methods
  showModal(): void;
  hideModal(): void;
  getModal(): JQuery<HTMLElement>;

  // Content methods
  getContent(): string;
  updateContent(content: string): void;

  // Event handling
  onSignup(callback: Function): void;
  onDismiss(callback: Function): void;
}

/**
 * Main beta tester module interface
 */
export interface BetaTesterModule {
  layout: BetaTesterLayout;
  config: BetaTesterConfig;

  // Lifecycle methods
  onInit(): void;
  bindEvents(): void;

  // Settings and elements
  getDefaultSettings(): BetaTesterSettings;
  getDefaultElements(): BetaTesterElements;
  elements: BetaTesterElements;

  // Main methods
  showLayout(always?: boolean): void;
  hideLayout(): void;

  // State management
  isEnabled(): boolean;
  isDismissed(): boolean;
  setDismissed(dismissed: boolean): void;

  // Beta program methods
  signup(email?: string): Promise<boolean>;
  optOut(): Promise<boolean>;
  checkForUpdates(): Promise<any>;
}

/**
 * Elementor Editor Promotion Utility
 *
 * Handles premium feature promotions, upgrade notices, and feature gating
 * for Elementor Pro features within the editor interface.
 */

import { Module } from "../../core/modules";

/**
 * Promotion types
 */
export type PromotionType =
  | "pro"
  | "expert"
  | "addon"
  | "feature"
  | "template"
  | "widget";

/**
 * Promotion context
 */
export type PromotionContext =
  | "panel"
  | "modal"
  | "widget"
  | "template"
  | "library"
  | "settings"
  | "inline";

/**
 * Promotion display mode
 */
export type PromotionMode =
  | "badge"
  | "overlay"
  | "popup"
  | "banner"
  | "tooltip"
  | "disable";

/**
 * Promotion data interface
 */
export interface PromotionData {
  /** Promotion ID */
  id: string;
  /** Promotion type */
  type: PromotionType;
  /** Feature name */
  feature: string;
  /** Display title */
  title: string;
  /** Description text */
  description: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA URL */
  ctaUrl?: string;
  /** Badge text */
  badgeText?: string;
  /** Icon class */
  icon?: string;
  /** Required plan level */
  requiredPlan?: string;
  /** Display context */
  context: PromotionContext;
  /** Display mode */
  mode: PromotionMode;
  /** Whether promotion is dismissible */
  dismissible?: boolean;
  /** Priority level */
  priority?: number;
  /** Custom CSS classes */
  cssClasses?: string[];
  /** Additional data */
  data?: Record<string, any>;
}

/**
 * Promotion configuration
 */
export interface PromotionConfig {
  /** Whether promotions are enabled */
  enabled: boolean;
  /** User plan level */
  userPlan: string;
  /** Available plans */
  availablePlans: string[];
  /** Upgrade URL */
  upgradeUrl: string;
  /** Trial URL */
  trialUrl?: string;
  /** Dismissed promotions */
  dismissed: string[];
  /** Promotion display limits */
  displayLimits: Record<string, number>;
}

/**
 * Promotion template data
 */
export interface PromotionTemplate {
  /** Template HTML */
  html: string;
  /** Template variables */
  variables: Record<string, string>;
}

/**
 * Promotion event data
 */
export interface PromotionEvent {
  /** Promotion data */
  promotion: PromotionData;
  /** Event type */
  type: "show" | "hide" | "click" | "dismiss";
  /** Context element */
  element?: HTMLElement;
}

/**
 * Promotion Utility Class
 */
export class Promotion extends Module {
	private config: PromotionConfig = {
		enabled: true,
		userPlan: 'free',
		availablePlans: ['free', 'pro', 'expert'],
		upgradeUrl: 'https://elementor.com/pro/',
		dismissed: [],
		displayLimits: {}
	};

	private promotions: Map<string, PromotionData> = new Map();
	private templates: Map<string, string> = new Map();
	private displayCounts: Map<string, number> = new Map();

  /**
   * Initialize promotion system
   */
  initialize(): void {
    this.loadConfig();
    this.registerDefaultPromotions();
    this.registerTemplates();
    this.setupEventHandlers();
  }

  /**
   * Load promotion configuration
   */
  private loadConfig(): void {
    const globalConfig = (globalThis as any).elementorPromotion;
    if (globalConfig) {
      this.config = { ...this.config, ...globalConfig };
    }

    // Load dismissed promotions from localStorage
    const dismissed = localStorage.getItem("elementor_dismissed_promotions");
    if (dismissed) {
      try {
        this.config.dismissed = JSON.parse(dismissed);
      } catch (error) {
        console.warn("Failed to parse dismissed promotions:", error);
      }
    }

    // Load display counts
    const counts = localStorage.getItem("elementor_promotion_counts");
    if (counts) {
      try {
        const countsData = JSON.parse(counts);
        this.displayCounts = new Map(Object.entries(countsData));
      } catch (error) {
        console.warn("Failed to parse promotion counts:", error);
      }
    }
  }

  /**
   * Register default promotions
   */
  private registerDefaultPromotions(): void {
    // Pro upgrade promotion
    this.register({
      id: "pro-upgrade",
      type: "pro",
      feature: "pro-features",
      title: "Go Pro",
      description:
        "Unlock advanced features, premium widgets, and professional templates",
      ctaText: "Upgrade Now",
      ctaUrl: this.config.upgradeUrl,
      badgeText: "PRO",
      icon: "eicon-pro-icon",
      context: "panel",
      mode: "badge",
      priority: 1,
    });

    // Theme Builder promotion
    this.register({
      id: "theme-builder",
      type: "pro",
      feature: "theme-builder",
      title: "Theme Builder",
      description: "Create custom headers, footers, and archive pages",
      ctaText: "Learn More",
      badgeText: "PRO",
      context: "panel",
      mode: "overlay",
      priority: 2,
    });

    // Popup Builder promotion
    this.register({
      id: "popup-builder",
      type: "pro",
      feature: "popup-builder",
      title: "Popup Builder",
      description: "Create stunning popups and lead generation forms",
      ctaText: "Upgrade to Pro",
      badgeText: "PRO",
      context: "panel",
      mode: "overlay",
      priority: 3,
    });

    // WooCommerce Builder promotion
    this.register({
      id: "woocommerce-builder",
      type: "pro",
      feature: "woocommerce",
      title: "WooCommerce Builder",
      description: "Design custom product pages and shop layouts",
      ctaText: "Get Pro",
      badgeText: "PRO",
      context: "widget",
      mode: "overlay",
      priority: 4,
    });
  }

  /**
   * Register promotion templates
   */
  private registerTemplates(): void {
    // Badge template
    this.templates.set(
      "badge",
      `
			<div class="elementor-promotion-badge {{cssClasses}}">
				<span class="elementor-promotion-badge-text">{{badgeText}}</span>
			</div>
		`
    );

    // Overlay template
    this.templates.set(
      "overlay",
      `
			<div class="elementor-promotion-overlay {{cssClasses}}">
				<div class="elementor-promotion-overlay-content">
					{{#if icon}}<i class="{{icon}}"></i>{{/if}}
					<h3>{{title}}</h3>
					<p>{{description}}</p>
					{{#if ctaText}}<button class="elementor-promotion-cta">{{ctaText}}</button>{{/if}}
					{{#if dismissible}}<button class="elementor-promotion-dismiss">&times;</button>{{/if}}
				</div>
			</div>
		`
    );

    // Popup template
    this.templates.set(
      "popup",
      `
			<div class="elementor-promotion-popup {{cssClasses}}">
				<div class="elementor-promotion-popup-content">
					<div class="elementor-promotion-popup-header">
						{{#if icon}}<i class="{{icon}}"></i>{{/if}}
						<h2>{{title}}</h2>
						{{#if dismissible}}<button class="elementor-promotion-popup-close">&times;</button>{{/if}}
					</div>
					<div class="elementor-promotion-popup-body">
						<p>{{description}}</p>
					</div>
					<div class="elementor-promotion-popup-footer">
						{{#if ctaText}}<button class="elementor-promotion-cta elementor-button">{{ctaText}}</button>{{/if}}
					</div>
				</div>
			</div>
		`
    );

    // Banner template
    this.templates.set(
      "banner",
      `
			<div class="elementor-promotion-banner {{cssClasses}}">
				<div class="elementor-promotion-banner-content">
					{{#if icon}}<i class="{{icon}}"></i>{{/if}}
					<div class="elementor-promotion-banner-text">
						<strong>{{title}}</strong>
						<span>{{description}}</span>
					</div>
					{{#if ctaText}}<button class="elementor-promotion-cta">{{ctaText}}</button>{{/if}}
					{{#if dismissible}}<button class="elementor-promotion-dismiss">&times;</button>{{/if}}
				</div>
			</div>
		`
    );
  }

  /**
   * Setup event handlers
   */
  private setupEventHandlers(): void {
    // Handle CTA clicks
    jQuery(document).on("click", ".elementor-promotion-cta", (event) => {
      const promotion = this.getPromotionFromElement(event.currentTarget);
      if (promotion) {
        this.handleCtaClick(promotion, event.currentTarget as HTMLElement);
      }
    });

    // Handle dismiss clicks
    jQuery(document).on("click", ".elementor-promotion-dismiss", (event) => {
      const promotion = this.getPromotionFromElement(event.currentTarget);
      if (promotion) {
        this.dismiss(promotion.id);
      }
    });

    // Handle popup close clicks
    jQuery(document).on(
      "click",
      ".elementor-promotion-popup-close",
      (event) => {
        const promotion = this.getPromotionFromElement(event.currentTarget);
        if (promotion) {
          this.hide(promotion.id);
        }
      }
    );
  }

  /**
   * Register a promotion
   */
  register(promotion: PromotionData): void {
    this.promotions.set(promotion.id, promotion);
  }

  /**
   * Unregister a promotion
   */
  unregister(id: string): void {
    this.promotions.delete(id);
  }

  /**
   * Get promotion by ID
   */
  get(id: string): PromotionData | undefined {
    return this.promotions.get(id);
  }

  /**
   * Get all promotions
   */
  getAll(): PromotionData[] {
    return Array.from(this.promotions.values());
  }

  /**
   * Check if user can access feature
   */
  canAccess(feature: string): boolean {
    if (!this.config.enabled) {
      return true;
    }

    // Check if user has required plan level
    const promotion = this.getByFeature(feature);
    if (!promotion) {
      return true;
    }

    return this.hasRequiredPlan(promotion);
  }

  /**
   * Check if user has required plan
   */
  private hasRequiredPlan(promotion: PromotionData): boolean {
    if (!promotion.requiredPlan) {
      return true;
    }

    const userPlanIndex = this.config.availablePlans.indexOf(
      this.config.userPlan
    );
    const requiredPlanIndex = this.config.availablePlans.indexOf(
      promotion.requiredPlan
    );

    return userPlanIndex >= requiredPlanIndex;
  }

  /**
   * Get promotion by feature
   */
  getByFeature(feature: string): PromotionData | undefined {
    return Array.from(this.promotions.values()).find(
      (p) => p.feature === feature
    );
  }

  /**
   * Get promotions by context
   */
  getByContext(context: PromotionContext): PromotionData[] {
    return Array.from(this.promotions.values())
      .filter((p) => p.context === context)
      .sort((a, b) => (a.priority || 999) - (b.priority || 999));
  }

  /**
   * Show promotion
   */
  show(id: string, element?: HTMLElement): boolean {
    const promotion = this.get(id);
    if (!promotion || !this.shouldShow(promotion)) {
      return false;
    }

    // Increment display count
    const count = this.displayCounts.get(id) || 0;
    this.displayCounts.set(id, count + 1);
    this.saveDisplayCounts();

    // Render promotion
    const rendered = this.render(promotion, element);
    if (rendered) {
      this.trigger("promotion:show", { promotion, type: "show", element });
      return true;
    }

    return false;
  }

  /**
   * Hide promotion
   */
  hide(id: string): void {
    const promotion = this.get(id);
    if (!promotion) {
      return;
    }

    // Remove promotion elements
    jQuery(`.elementor-promotion-${id}`).remove();
    this.trigger("promotion:hide", { promotion, type: "hide" });
  }

  /**
   * Dismiss promotion
   */
  dismiss(id: string): void {
    const promotion = this.get(id);
    if (!promotion) {
      return;
    }

    // Add to dismissed list
    if (!this.config.dismissed.includes(id)) {
      this.config.dismissed.push(id);
      this.saveDismissed();
    }

    this.hide(id);
    this.trigger("promotion:dismiss", { promotion, type: "dismiss" });
  }

  /**
   * Check if promotion should be shown
   */
  private shouldShow(promotion: PromotionData): boolean {
    // Check if promotions are enabled
    if (!this.config.enabled) {
      return false;
    }

    // Check if user already has required plan
    if (this.hasRequiredPlan(promotion)) {
      return false;
    }

    // Check if promotion is dismissed
    if (this.config.dismissed.includes(promotion.id)) {
      return false;
    }

    // Check display limits
    const limit = this.config.displayLimits[promotion.id];
    if (limit !== undefined) {
      const count = this.displayCounts.get(promotion.id) || 0;
      if (count >= limit) {
        return false;
      }
    }

    return true;
  }

  /**
   * Render promotion
   */
  private render(
    promotion: PromotionData,
    element?: HTMLElement
  ): HTMLElement | null {
    const template = this.templates.get(promotion.mode);
    if (!template) {
      console.warn(`Promotion template not found: ${promotion.mode}`);
      return null;
    }

    // Compile template
    const html = this.compileTemplate(template, promotion);
    const promotionElement = jQuery(html).addClass(
      `elementor-promotion-${promotion.id}`
    )[0];

    // Attach to element or body
    if (element) {
      if (promotion.mode === "badge") {
        jQuery(element).append(promotionElement);
      } else if (promotion.mode === "overlay") {
        jQuery(element).css("position", "relative").append(promotionElement);
      } else {
        jQuery(element).after(promotionElement);
      }
    } else {
      jQuery("body").append(promotionElement);
    }

    return promotionElement;
  }

  /**
   * Compile template with data
   */
  private compileTemplate(template: string, data: PromotionData): string {
    let compiled = template;

    // Replace variables
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        compiled = compiled.replace(
          new RegExp(`{{${key}}}`, "g"),
          String(value)
        );
      }
    });

    // Handle conditionals
    compiled = compiled.replace(
      /{{#if (\w+)}}(.*?){{\/if}}/gs,
      (match, condition, content) => {
        return data[condition as keyof PromotionData] ? content : "";
      }
    );

    // Handle CSS classes
    const cssClasses = data.cssClasses ? data.cssClasses.join(" ") : "";
    compiled = compiled.replace(/{{cssClasses}}/g, cssClasses);

    return compiled;
  }

  /**
   * Handle CTA click
   */
  private handleCtaClick(promotion: PromotionData, element: HTMLElement): void {
    this.trigger("promotion:click", { promotion, type: "click", element });

    if (promotion.ctaUrl) {
      // Track click event
      this.trackEvent("promotion_cta_click", {
        promotion_id: promotion.id,
        feature: promotion.feature,
        context: promotion.context,
      });

      // Open URL
      window.open(promotion.ctaUrl, "_blank");
    }
  }

  /**
   * Get promotion from DOM element
   */
  private getPromotionFromElement(element: Element): PromotionData | undefined {
    const promotionEl = jQuery(element).closest(
      '[class*="elementor-promotion-"]'
    )[0];
    if (!promotionEl) {
      return undefined;
    }

    const classList = Array.from(promotionEl.classList);
    const promotionClass = classList.find((cls) =>
      cls.startsWith("elementor-promotion-")
    );
    if (!promotionClass) {
      return undefined;
    }

    const id = promotionClass.replace("elementor-promotion-", "");
    return this.get(id);
  }

  /**
   * Track promotion event
   */
  private trackEvent(event: string, data: Record<string, any>): void {
    // Send to analytics if available
    const gtag = (globalThis as any).gtag;
    if (typeof gtag !== "undefined") {
      gtag("event", event, data);
    }

    // Send to WordPress if available
    if ((globalThis as any).wp?.ajax) {
      (globalThis as any).wp.ajax.post("elementor_track_promotion", {
        event,
        data: JSON.stringify(data),
      });
    }
  }

  /**
   * Save dismissed promotions
   */
  private saveDismissed(): void {
    localStorage.setItem(
      "elementor_dismissed_promotions",
      JSON.stringify(this.config.dismissed)
    );
  }

  /**
   * Save display counts
   */
  private saveDisplayCounts(): void {
    const countsObject = Object.fromEntries(this.displayCounts);
    localStorage.setItem(
      "elementor_promotion_counts",
      JSON.stringify(countsObject)
    );
  }

  /**
   * Show feature gate
   */
  showFeatureGate(feature: string, element?: HTMLElement): boolean {
    const promotion = this.getByFeature(feature);
    if (!promotion) {
      return false;
    }

    return this.show(promotion.id, element);
  }

  /**
   * Create inline promotion
   */
  createInline(data: Partial<PromotionData>): HTMLElement | null {
    const promotion: PromotionData = {
      id: `inline-${Date.now()}`,
      type: "pro",
      feature: "inline",
      title: "Premium Feature",
      description: "This feature requires Elementor Pro",
      context: "inline",
      mode: "badge",
      ...data,
    };

    return this.render(promotion);
  }

  /**
   * Update user plan
   */
  updateUserPlan(plan: string): void {
    this.config.userPlan = plan;

    // Hide promotions that are no longer relevant
    this.getAll().forEach((promotion) => {
      if (this.hasRequiredPlan(promotion)) {
        this.hide(promotion.id);
      }
    });
  }

  /**
   * Reset dismissed promotions
   */
  resetDismissed(): void {
    this.config.dismissed = [];
    this.saveDismissed();
  }

  /**
   * Reset display counts
   */
  resetDisplayCounts(): void {
    this.displayCounts.clear();
    this.saveDisplayCounts();
  }

  /**
   * Get promotion statistics
   */
  getStats(): {
    total: number;
    shown: number;
    dismissed: number;
    displayCounts: Record<string, number>;
  } {
    return {
      total: this.promotions.size,
      shown: Array.from(this.promotions.keys()).filter(
        (id) => !this.config.dismissed.includes(id)
      ).length,
      dismissed: this.config.dismissed.length,
      displayCounts: Object.fromEntries(this.displayCounts),
    };
  }
}

// Global type declarations
declare global {
  interface Window {
    elementorPromotion?: PromotionConfig;
    gtag?: (
      command: string,
      action: string,
      parameters?: Record<string, any>
    ) => void;
  }
}

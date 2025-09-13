/**
 * Container-specific handler types for Elementor containers
 */

import type { Base } from "./base";

/**
 * Container element handler
 */
export declare class Container extends Base {
  spacingReset?: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };

  onElementChange(propertyName: string): void;
  onSectionOrColumnOrContainerChange(propertyName: string): void;
  isDesktopRange(): boolean;
  isTabletRange(): boolean;
  isMobileRange(): boolean;
  onBorderRadiusChange(): void;
  onBackgroundChange(): void;
  onPaddingChange(): void;
  onMarginChange(): void;
  onPositionChange(): void;
  onZIndexChange(): void;
  onElementWidthChange(propertyName: string): void;
  onElementHeightChange(propertyName: string): void;
  onMinHeightChange(): void;
  onDisplayChange(): void;
  onOverflowChange(): void;
  onTransformChange(): void;
  onMotionEffectsChange(): void;
  onFlexChange(): void;
}

/**
 * Section element handler
 */
export declare class Section extends Container {
  isSectionStretchDisabled: boolean;

  getStretchedClass(): string;
  initStretch(): void;
  onSectionChange(propertyName: string): void;
  onChildChange(propertyName: string): void;
  onSectionOrColumnOrContainerChange(propertyName: string): void;
  setStretchedSection(): void;
  unSetStretchedSection(): void;
  getChildView(id: string): any;
}

/**
 * Column element handler
 */
export declare class Column extends Container {
  onColumnChange(propertyName: string): void;
  onSectionOrColumnOrContainerChange(propertyName: string): void;
}

/**
 * Widget element handler base
 */
export declare class Widget extends Base {
  onWidgetChange(propertyName: string): void;
  onElementChange(propertyName: string): void;
}

/**
 * Helper Types and Utilities
 * Developer-friendly helper types for common Elementor patterns
 */

/**
 * Generic responsive value type for settings that support different values per device
 */
export type ResponsiveValue<T> =
  | {
      desktop?: T;
      tablet?: T;
      mobile?: T;
      mobile_extra?: T;
      tablet_extra?: T;
      laptop?: T;
      widescreen?: T;
    }
  | T;

/**
 * Generic element settings type with responsive support
 */
export type ElementSettings<T = any> = {
  [K in keyof T]: T[K] extends ResponsiveValue<infer U>
    ? ResponsiveValue<U>
    : T[K];
} & {
  [key: string]: any;
};

/**
 * CSS value type for properties that accept units
 */
export type CSSValue =
  | {
      size: number | string;
      unit: "px" | "em" | "rem" | "%" | "vw" | "vh" | "vmin" | "vmax";
    }
  | string
  | number;

/**
 * Responsive CSS value type
 */
export type ResponsiveCSSValue = ResponsiveValue<CSSValue>;

/**
 * Dimensions value type (padding, margin, etc.)
 */
export type DimensionsValue = {
  top?: CSSValue;
  right?: CSSValue;
  bottom?: CSSValue;
  left?: CSSValue;
  unit?: string;
  isLinked?: boolean;
};

/**
 * Border value type
 */
export type BorderValue = {
  width?: CSSValue;
  color?: string;
  style?:
    | "solid"
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none";
};

/**
 * Box shadow value type
 */
export type BoxShadowValue = {
  horizontal?: number;
  vertical?: number;
  blur?: number;
  spread?: number;
  color?: string;
  position?: "inset" | "outset";
};

/**
 * Typography value type
 */
export type TypographyValue = {
  family?: string;
  size?: ResponsiveCSSValue;
  weight?: string | number;
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  style?: "normal" | "italic" | "oblique";
  decoration?: "none" | "underline" | "overline" | "line-through";
  line_height?: ResponsiveCSSValue;
  letter_spacing?: ResponsiveCSSValue;
  word_spacing?: ResponsiveCSSValue;
};

/**
 * Media value type (images, videos)
 */
export type MediaValue = {
  id?: number;
  url?: string;
  alt?: string;
  source?: "library" | "external";
  dimensions?: {
    width: number;
    height: number;
  };
};

/**
 * Icon value type
 */
export type IconValue = {
  value?: string;
  library?: string;
  custom?: {
    id?: number;
    url?: string;
  };
};

/**
 * Link value type
 */
export type LinkValue = {
  url?: string;
  is_external?: boolean;
  nofollow?: boolean;
  custom_attributes?: string;
};

/**
 * Repeater item type
 */
export type RepeaterItem<T = any> = T & {
  _id: string;
};

/**
 * Color value type (supports global colors)
 */
export type ColorValue =
  | {
      color?: string;
      global?: {
        id: string;
      };
    }
  | string;

/**
 * Element type identifiers
 */
export type ElementType = "section" | "column" | "widget" | "container";

/**
 * Widget type identifiers (common widgets)
 */
export type WidgetType =
  | "heading"
  | "text-editor"
  | "image"
  | "button"
  | "spacer"
  | "divider"
  | "tabs"
  | "accordion"
  | "toggle"
  | "counter"
  | "progress"
  | "video"
  | "carousel"
  | "gallery"
  | "testimonial"
  | "icon"
  | "icon-list"
  | "icon-box"
  | "star-rating"
  | "alert"
  | "social-icons"
  | "wp-widget-archives"
  | "wp-widget-calendar"
  | "wp-widget-categories"
  | "wp-widget-meta"
  | "wp-widget-nav-menu"
  | "wp-widget-pages"
  | "wp-widget-recent-comments"
  | "wp-widget-recent-posts"
  | "wp-widget-rss"
  | "wp-widget-search"
  | "wp-widget-tag-cloud"
  | "wp-widget-text"
  | string;

/**
 * Animation value type
 */
export type AnimationValue = {
  animation?: string;
  duration?: number;
  delay?: number;
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  fillMode?: "none" | "forwards" | "backwards" | "both";
  iterationCount?: number | "infinite";
  timingFunction?: string;
};

/**
 * Transform value type
 */
export type TransformValue = {
  translateX?: CSSValue;
  translateY?: CSSValue;
  translateZ?: CSSValue;
  rotateX?: CSSValue;
  rotateY?: CSSValue;
  rotateZ?: CSSValue;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  skewX?: CSSValue;
  skewY?: CSSValue;
  perspective?: CSSValue;
};

/**
 * Filter value type
 */
export type FilterValue = {
  blur?: CSSValue;
  brightness?: number;
  contrast?: number;
  grayscale?: number;
  hueRotate?: CSSValue;
  invert?: number;
  opacity?: number;
  saturate?: number;
  sepia?: number;
  dropShadow?: {
    offsetX: CSSValue;
    offsetY: CSSValue;
    blurRadius: CSSValue;
    color: string;
  };
};

/**
 * Grid value type
 */
export type GridValue = {
  columns?: number | string;
  rows?: number | string;
  gap?: CSSValue;
  columnGap?: CSSValue;
  rowGap?: CSSValue;
  justifyContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-around"
    | "space-between"
    | "space-evenly";
  alignContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-around"
    | "space-between"
    | "space-evenly";
  justifyItems?: "start" | "end" | "center" | "stretch";
  alignItems?: "start" | "end" | "center" | "stretch";
};

/**
 * Flexbox value type
 */
export type FlexboxValue = {
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  alignContent?:
    | "stretch"
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  gap?: CSSValue;
};

/**
 * Utility type for extracting element settings
 */
export type ExtractSettings<T> = T extends { settings: infer S } ? S : never;

/**
 * Utility type for making all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Utility type for making specific properties required
 */
export type RequireProperties<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Utility type for omitting properties recursively
 */
export type DeepOmit<T, K extends string> = {
  [P in keyof T]: P extends K
    ? never
    : T[P] extends object
    ? DeepOmit<T[P], K>
    : T[P];
};

/**
 * Utility type for extracting responsive values
 */
export type ExtractResponsiveValue<T> = T extends ResponsiveValue<infer U>
  ? U
  : T;

/**
 * Utility type for widget-specific settings
 */
export type WidgetSettings<W extends WidgetType> = ElementSettings & {
  widgetType: W;
  // Widget-specific settings would be defined per widget type
};

/**
 * Utility type for conditional settings based on other settings
 */
export type ConditionalSettings<T, K extends keyof T, V extends T[K], S> = T & {
  [P in K]: V;
} & S;

/**
 * Common breakpoint names used in Elementor
 */
export type BreakpointName =
  | "desktop"
  | "laptop"
  | "tablet_extra"
  | "tablet"
  | "mobile_extra"
  | "mobile"
  | "widescreen";

/**
 * Device type detection
 */
export type DeviceType = "desktop" | "tablet" | "mobile";

/**
 * Element state types
 */
export type ElementState = "normal" | "hover" | "active" | "focus";

/**
 * CSS property keys that support responsive values
 */
export type ResponsiveCSSProperty =
  | "width"
  | "height"
  | "margin"
  | "padding"
  | "fontSize"
  | "lineHeight"
  | "borderRadius"
  | "borderWidth"
  | "gap"
  | "columnGap"
  | "rowGap"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "zIndex"
  | "letterSpacing"
  | "wordSpacing"
  | "textIndent";

/**
 * Event handler utility types
 */
export type ElementorEventHandler<T = any> = (event: Event, data?: T) => void;
export type ElementorAsyncEventHandler<T = any> = (
  event: Event,
  data?: T
) => Promise<void>;

/**
 * Validation utility types
 */
export type ValidationRule<T = any> = (value: T) => boolean | string;
export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]> | ValidationRule<T[K]>[];
};

/**
 * API response utility types
 */
export type APIResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T = any> = APIResponse<T[]> & {
  pagination?: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};

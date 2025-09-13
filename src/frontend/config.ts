/**
 * Frontend Configuration
 * Configuration interfaces for Elementor frontend
 */

/**
 * Main frontend configuration interface
 */
export interface ElementorFrontendConfig {
  environmentMode: {
    edit: boolean;
    wpPreview: boolean;
    isScriptDebug: boolean;
  };
  is_rtl: boolean;
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  responsive: {
    breakpoints: {
      [key: string]: {
        label: string;
        value: number;
        default_value: number;
        direction: "min" | "max";
        is_enabled: boolean;
      };
    };
    activeBreakpoints: {
      [key: string]: {
        label: string;
        value: number;
        default_value: number;
        direction: "min" | "max";
        is_enabled: boolean;
      };
    };
    hasCustomBreakpoints?: boolean;
  };
  version: string;
  is_static: boolean;
  legacyMode: {
    elementWrappers: boolean;
  };
  urls: {
    assets: string;
    rest: string;
    uploadUrl: string;
  };
  settings: {
    page: {
      [key: string]: any;
    };
    editorPreferences?: {
      [key: string]: any;
    };
  };
  kit: {
    [key: string]: any;
  };
  elements: {
    data: {
      [modelCID: string]: {
        id: string;
        elType: string;
        widgetType?: string;
        settings: object;
        attributes: {
          [key: string]: any;
        };
      };
    };
  };
  i18n: {
    [key: string]: string;
  } & {
    a11yCarouselPrevSlideMessage?: string;
    a11yCarouselNextSlideMessage?: string;
    a11yCarouselFirstSlideMessage?: string;
    a11yCarouselLastSlideMessage?: string;
  };
  experimentalFeatures: {
    e_font_icon_svg?: boolean;
    container?: boolean;
    "nested-elements"?: boolean;
    [key: string]: boolean | undefined;
  };
}

/**
 * Environment mode configuration
 */
export interface EnvironmentMode {
  edit: boolean;
  wpPreview: boolean;
  isScriptDebug: boolean;
}

/**
 * Breakpoint values
 */
export interface BreakpointValues {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

/**
 * Responsive configuration
 */
export interface ResponsiveConfig {
  breakpoints: {
    [key: string]: {
      label: string;
      value: number;
      default_value: number;
      direction: "min" | "max";
      is_enabled: boolean;
    };
  };
  activeBreakpoints: {
    [key: string]: {
      label: string;
      value: number;
      default_value: number;
      direction: "min" | "max";
      is_enabled: boolean;
    };
  };
  hasCustomBreakpoints?: boolean;
}

/**
 * Breakpoint configuration
 */
export interface BreakpointConfig {
  label: string;
  value: number;
  default_value: number;
  direction: "min" | "max";
  is_enabled: boolean;
}

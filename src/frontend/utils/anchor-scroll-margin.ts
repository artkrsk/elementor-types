/**
 * Anchor Scroll Margin Utilities
 *
 * Mirrors frontend/utils/anchor-scroll-margin.js
 * Applies scroll-margin-top on anchor targets to account for sticky elements
 */

/**
 * Anchor Scroll Margin Utilities (extends ViewModule)
 */
export interface AnchorScrollMarginUtils {
  getDefaultSettings(): {
    selectors: {
      links: string;
      stickyElements: string;
    };
  };

  onInit(): void;

  /** Create a MutationObserver on document.body to watch for sticky element changes */
  observeStickyElements(callback: Function): void;

  /** Scan DOM for anchor links and sticky elements, then apply scroll-margin-top */
  initializeStickyAndAnchorTracking(): void;

  trackAnchorLinks(anchorLinks: Element[], trackedElements: any[]): void;
  trackStickyElements(stickyElements: Element[], trackedElements: any[]): void;
  organizeStickyAndAnchors(elements: any[]): void;
  defineCurrentStickyRange(
    sticky: any,
    index: number,
    stickyList: any[],
    anchorList: any[]
  ): void;

  getScrollPosition(element: Element): number;
  getAllStickyElements(): Element[];
  getAllAnchorLinks(): Element[];
  filterAndSortElementsByType(elements: any[], type: string): any[];
  isValidSelector(hash: string): boolean;
  getAnchorTarget(element: Element): Element | null;
  getElementSettings(element: Element): Record<string, any> | null;
}

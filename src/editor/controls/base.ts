/**
 * Base Control Classes
 * Core control types that all other controls extend from
 */

import type { Module } from "../../core/modules";

/**
 * Base control view class
 */
export declare class ControlBaseView extends Module {
  model: any;
  container: any;
  elementSettingsModel: any; // deprecated

  ui(): object;
  events(): object;
  templateHelpers(): object;
  className(): string;
  behaviors(): object;
  getBehavior(name: string): any;
  getTemplate(): any;
  getControlValue(): any;
  setValue(value: any): void;
  applySavedValue(): void;
  updateElementModel(value: any): void;
  onRender(): void;
  onDestroy(): void;
  saveEditor(): void;
  onBaseInputChange(event: Event): void;
  onBeforeDestroy(): void;
}

/**
 * Base data control class with validation and responsive support
 */
export declare class ControlBaseDataView extends ControlBaseView {
  validatorTypes: {
    Base: any;
    Number: any;
    Breakpoint: any;
  };
  isFirstClick?: boolean;
  showInput?: boolean;
  disableSearch?: boolean;
  allowMultiple?: boolean;

  onBaseInputTextChange(event: Event): void;
  onBaseInputChange(event: Event): void;
  onResponsiveSwitchersClick(event: Event): void;
  validateSettings(): void;
  onRender(): void;
  onDestroy(): void;
  updateElementModel(value: any): void;
  applySavedValue(): void;
  getGlobalKey(): string;
  getCurrentValue(): any;
  isGlobalActive(): boolean;
  toggleLinkedItems(): void;
}

/**
 * Base multiple control class for controls with multiple values
 */
export declare class ControlBaseMultiple extends ControlBaseDataView {
  childView: any;
  childViewContainer: string;

  templateHelpers(): object;
  getChildType(): string;
  getChildView(): any;
  getChildViewOptions(model: any): object;
  updateElementModel(value: any): void;
  onRender(): void;
  onBeforeDestroy(): void;
}

/**
 * Base units control class for controls with unit selection
 */
export declare class ControlBaseUnits extends ControlBaseDataView {
  currentUnit?: string;
  unitMeasures?: object;
  $controls?: JQuery;
  units?: string[];

  getUnit(): string;
  getDefaultValue(): any;
  updateUnitsChoices(): void;
  onUnitChange(): void;
  onInputChange(): void;
  initUnits(): void;
}

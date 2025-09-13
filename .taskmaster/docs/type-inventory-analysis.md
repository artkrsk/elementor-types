# Elementor Types Inventory Analysis

## Summary Statistics

- **Total Lines**: 2,721
- **Interfaces**: 34
- **Classes**: 262
- **Namespaces**: 97
- **Type Aliases**: 14
- **Enums**: 0

## Direct Exports (Top-level exported types)

### Exported Interfaces (28 found)

1. ElementorSwiperOptions
2. DynamicTags
3. TemplateLibrary
4. HistoryManager
5. Panel
6. Navigator
7. ResponsiveBar
8. Notifications
9. IntroductionTooltips
10. Validator
11. ElementorGlobals
12. ElementorIconsManager
13. ElementorFrontendConfig
14. ElementorFrontend
15. HandlerOptions
16. ElementsHandler
17. DocumentsManager
18. ElementorBreakpoints
19. AssetsLoader
20. Controls
21. VideoLoader
22. UrlActions
23. Events
24. ElementorEditor
25. ElementorUtils
26. ElementorTiers
27. IconsManager

### Exported Types (1 found)

1. { Swiper, SwiperOptions } (re-export)

## Major Namespace Hierarchies

### ElementorModules (Root namespace)

- ElementorModules.utils
- ElementorModules.frontend
  - ElementorModules.frontend.handlers
    - ElementorModules.frontend.handlers.container
    - ElementorModules.frontend.handlers.section
    - ElementorModules.frontend.handlers.accessibility
  - ElementorModules.frontend.tools
  - ElementorModules.frontend.utils
    - ElementorModules.frontend.utils.icons
    - ElementorModules.frontend.utils.lightbox
    - ElementorModules.frontend.utils.videoApi
- ElementorModules.editor
  - ElementorModules.editor.controls
    - ElementorModules.editor.controls.behaviors
  - ElementorModules.editor.elements
    - ElementorModules.editor.elements.types
      - ElementorModules.editor.elements.types.base
    - ElementorModules.editor.elements.models
    - ElementorModules.editor.elements.views
      - ElementorModules.editor.elements.views.behaviors
      - ElementorModules.editor.elements.views.container
    - ElementorModules.editor.elements.collections
  - ElementorModules.editor.data
    - ElementorModules.editor.data.channels
  - ElementorModules.editor.settings
  - ElementorModules.editor.regions
    - ElementorModules.editor.regions.panel
      - ElementorModules.editor.regions.panel.commands
      - ElementorModules.editor.regions.panel.pages
        - ElementorModules.editor.regions.panel.pages.editor

### $e Namespace (Command System)

- $e.modules
- $e.components
- Route interface
- Main command functions (route, run, runShortcut)

### Global Declarations

- Window interface augmentations
- Global constants and functions

## Critical Analysis Points

### 1. Core Module System

- Module, ViewModule, ArgsObject classes are foundation
- Used throughout frontend and editor hierarchies
- Must be preserved exactly

### 2. Frontend Handler System

- Complex inheritance hierarchy
- Base → StretchedElement → specific handlers
- Swiper-based handlers for carousels
- Widget-specific handlers (Tabs, Video, etc.)

### 3. Editor Control System

- Extensive control type hierarchy
- Base controls → specific control types
- Control behaviors and validation
- Over 30 different control types

### 4. Command System ($e)

- Central to editor functionality
- Component registry and routing
- Command base classes and validation
- Cross-component communication

### 5. Type Relationships

- Deep interdependencies between modules
- Generic types and constraints
- Interface inheritance chains
- Namespace member access patterns

## Verification Checkpoints

✓ **Inventory Complete**: All major structures cataloged
⏳ **Location Mapping**: Map each type to new modular location
⏳ **Signature Verification**: Compare exact signatures
⏳ **Dependency Analysis**: Check cross-module references
⏳ **Export Testing**: Verify all types accessible
⏳ **Build Verification**: Ensure compilation success

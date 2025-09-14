# Detailed File-by-File Mapping: Original Elementor JS → Types Package

## Module System

### Original → Target Mapping

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `modules/modules.js` | `src/modules/index.ts` | ❌ Missing | HIGH |
| `modules/imports/module.js` | `src/core/modules/module.ts` | ✅ Exists | - |
| `modules/imports/view-module.js` | `src/core/modules/view-module.ts` | ✅ Exists | - |
| `modules/imports/args-object.js` | `src/core/modules/args-object.ts` | ✅ Exists | - |
| `modules/imports/force-method-implementation.js` | `src/core/modules/force-implementation.ts` | ✅ Exists | - |
| `modules/imports/utils/masonry.js` | `src/modules/utils/masonry.ts` | ❌ Missing | MED |
| `modules/imports/utils/scroll.js` | `src/modules/utils/scroll.ts` | ❌ Missing | MED |

## Frontend System

### Core Frontend Files

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `frontend/frontend.js` | `src/frontend/main.ts` | ✅ Exists | - |
| `frontend/modules.js` | `src/frontend/index.ts` | ✅ Exists | - |
| `frontend/documents-manager.js` | `src/frontend/documents-manager.ts` | ❌ Missing | HIGH |
| `frontend/document.js` | `src/frontend/document.ts` | ❌ Missing | HIGH |

### Frontend Handlers

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `frontend/handlers/base.js` | `src/frontend/handlers/base.ts` | ✅ Exists | - |
| `frontend/handlers/base-swiper.js` | `src/frontend/handlers/base-swiper.ts` | ❌ Missing | MED |
| `frontend/handlers/base-carousel.js` | `src/frontend/handlers/base-carousel.ts` | ❌ Missing | MED |
| `frontend/handlers/stretched-element.js` | `src/frontend/handlers/stretched-element.ts` | ❌ Missing | MED |
| `frontend/handlers/accessibility/*` | `src/frontend/handlers/accessibility/` | ❌ Missing | MED |
| `frontend/handlers/container/*` | `src/frontend/handlers/container/` | ❌ Missing | HIGH |
| `frontend/handlers/section/*` | `src/frontend/handlers/section/` | ❌ Missing | HIGH |

### Frontend Tools

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `frontend/tools/stretch-element.js` | `src/frontend/tools/stretch-element.ts` | ❌ Missing | MED |

### Frontend Utils

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `frontend/utils/utils.js` | `src/frontend/utils/utils.ts` | ✅ Exists | - |
| `frontend/utils/controls.js` | `src/frontend/utils/controls.ts` | ❌ Missing | MED |
| `frontend/utils/assets-loader.js` | `src/frontend/utils/assets-loader.ts` | ❌ Missing | MED |
| `frontend/utils/swiper.js` | `src/frontend/utils/swiper.ts` | ❌ Missing | MED |
| `frontend/utils/url-actions.js` | `src/frontend/utils/url-actions.ts` | ❌ Missing | MED |
| `frontend/utils/anchor-scroll-margin.js` | `src/frontend/utils/anchor-scroll-margin.ts` | ❌ Missing | LOW |
| `frontend/utils/anchors.js` | `src/frontend/utils/anchors.ts` | ❌ Missing | LOW |
| `frontend/utils/flex-horizontal-scroll.js` | `src/frontend/utils/flex-horizontal-scroll.ts` | ❌ Missing | LOW |

#### Frontend Utils - Lightbox

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `frontend/utils/lightbox/lightbox-manager.js` | `src/frontend/utils/lightbox/manager.ts` | ❌ Missing | MED |
| `frontend/utils/lightbox/lightbox.js` | `src/frontend/utils/lightbox/lightbox.ts` | ❌ Missing | MED |
| `frontend/utils/lightbox/screenfull.js` | `src/frontend/utils/lightbox/screenfull.ts` | ❌ Missing | LOW |

#### Frontend Utils - Video API

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `frontend/utils/video-api/base-loader.js` | `src/frontend/utils/video-api/base-loader.ts` | ❌ Missing | MED |
| `frontend/utils/video-api/youtube-loader.js` | `src/frontend/utils/video-api/youtube-loader.ts` | ❌ Missing | MED |
| `frontend/utils/video-api/vimeo-loader.js` | `src/frontend/utils/video-api/vimeo-loader.ts` | ❌ Missing | MED |

#### Frontend Utils - Icons

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `frontend/utils/icons/manager.js` | `src/frontend/utils/icons/manager.ts` | ❌ Missing | LOW |
| `frontend/utils/icons/e-icons.js` | `src/frontend/utils/icons/e-icons.ts` | ❌ Missing | LOW |

## Editor System

### Core Editor Files

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/editor.js` | `src/editor/editor.ts` | ❌ Missing | HIGH |
| `editor/editor-base.js` | `src/editor/editor-base.ts` | ❌ Missing | HIGH |
| `editor/editor-document.js` | `src/editor/editor-document.ts` | ❌ Missing | HIGH |
| `editor/modules.js` | `src/editor/index.ts` | ✅ Partial | HIGH |
| `editor/component-base.js` | `src/editor/component-base.ts` | ❌ Missing | HIGH |

### Editor Command Bases

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/command-bases/*` | `src/editor/command-bases/` | ❌ Missing | HIGH |

### Editor Components

#### Browser Import Component

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/components/browser-import/manager.js` | `src/editor/components/browser-import/manager.ts` | ❌ Missing | MED |
| `editor/components/browser-import/commands/*` | `src/editor/components/browser-import/commands/` | ❌ Missing | MED |
| `editor/components/browser-import/files/*` | `src/editor/components/browser-import/files/` | ❌ Missing | MED |

#### Documents Component

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/components/documents/component.js` | `src/editor/components/documents/component.ts` | ❌ Missing | HIGH |
| `editor/components/documents/commands/*` | `src/editor/components/documents/commands/` | ❌ Missing | HIGH |
| `editor/components/documents/hooks/*` | `src/editor/components/documents/hooks/` | ❌ Missing | HIGH |
| `editor/components/documents/models/*` | `src/editor/components/documents/models/` | ❌ Missing | HIGH |

#### Other Key Components

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/components/dynamic-tags/*` | `src/editor/components/dynamic-tags/` | ✅ Exists | - |
| `editor/components/hotkeys/*` | `src/editor/components/hotkeys/` | ❌ Missing | MED |
| `editor/components/icons-manager/*` | `src/editor/components/icons-manager/` | ✅ Exists | - |
| `editor/components/preview/*` | `src/editor/components/preview/` | ❌ Missing | MED |
| `editor/components/selection/*` | `src/editor/components/selection/` | ❌ Missing | MED |
| `editor/components/validator/*` | `src/editor/components/validator/` | ❌ Missing | LOW |

#### Settings Components

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/components/settings/base/*` | `src/editor/components/settings/base/` | ❌ Missing | MED |
| `editor/components/settings/editor-preferences/*` | `src/editor/components/settings/preferences/` | ❌ Missing | MED |
| `editor/components/settings/page/*` | `src/editor/components/settings/page/` | ❌ Missing | MED |

#### Template Library

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/components/template-library/behaviors/*` | `src/editor/components/template-library/behaviors/` | ❌ Missing | MED |
| `editor/components/template-library/collections/*` | `src/editor/components/template-library/collections/` | ❌ Missing | MED |
| `editor/components/template-library/commands/*` | `src/editor/components/template-library/commands/` | ❌ Missing | MED |
| `editor/components/template-library/views/*` | `src/editor/components/template-library/views/` | ❌ Missing | MED |

### Editor Container System

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/container/container.js` | `src/editor/container/container.ts` | ❌ Missing | HIGH |
| `editor/container/model/*` | `src/editor/container/model/` | ❌ Missing | HIGH |

### Editor Controls

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/controls/color.js` | `src/editor/controls/color.ts` | ✅ Exists | - |
| `editor/controls/behaviors/*` | `src/editor/controls/behaviors/` | ✅ Exists | - |

### Editor Data System

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/data/globals/component.js` | `src/editor/data/globals/component.ts` | ❌ Missing | HIGH |
| `editor/data/globals/base/*` | `src/editor/data/globals/base/` | ❌ Missing | HIGH |
| `editor/data/globals/colors/*` | `src/editor/data/globals/colors/` | ❌ Missing | HIGH |
| `editor/data/globals/typography/*` | `src/editor/data/globals/typography/` | ❌ Missing | HIGH |
| `editor/data/globals/commands/*` | `src/editor/data/globals/commands/` | ❌ Missing | HIGH |

### Editor Document System

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/document/component.js` | `src/editor/document/component.ts` | ❌ Missing | HIGH |
| `editor/document/command-bases/*` | `src/editor/document/command-bases/` | ❌ Missing | HIGH |
| `editor/document/dynamic/*` | `src/editor/document/dynamic/` | ❌ Missing | HIGH |
| `editor/document/elements/*` | `src/editor/document/elements/` | ❌ Missing | HIGH |
| `editor/document/globals/*` | `src/editor/document/globals/` | ❌ Missing | HIGH |
| `editor/document/history/*` | `src/editor/document/history/` | ❌ Missing | HIGH |
| `editor/document/hooks/*` | `src/editor/document/hooks/` | ❌ Missing | HIGH |
| `editor/document/repeater/*` | `src/editor/document/repeater/` | ❌ Missing | HIGH |
| `editor/document/save/*` | `src/editor/document/save/` | ❌ Missing | HIGH |
| `editor/document/ui/*` | `src/editor/document/ui/` | ❌ Missing | HIGH |
| `editor/document/ui-states/*` | `src/editor/document/ui-states/` | ❌ Missing | HIGH |

### Editor Elements

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/elements/manager.js` | `src/editor/elements/manager.ts` | ❌ Missing | HIGH |
| `editor/elements/collections/*` | `src/editor/elements/collections/` | ✅ Exists | - |
| `editor/elements/models/*` | `src/editor/elements/models/` | ✅ Exists | - |
| `editor/elements/types/*` | `src/editor/elements/types/` | ✅ Exists | - |
| `editor/elements/views/*` | `src/editor/elements/views/` | ✅ Exists | - |

### Editor Regions

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/regions/navigator/navigator.js` | `src/editor/regions/navigator/navigator.ts` | ❌ Missing | HIGH |
| `editor/regions/navigator/commands/*` | `src/editor/regions/navigator/commands/` | ❌ Missing | HIGH |
| `editor/regions/panel/commands/*` | `src/editor/regions/panel/commands/` | ❌ Missing | HIGH |
| `editor/regions/panel/pages/*` | `src/editor/regions/panel/pages/` | ❌ Missing | HIGH |
| `editor/regions/responsive-bar/*` | `src/editor/regions/responsive-bar/` | ❌ Missing | HIGH |

### Editor Utils

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/utils/module.js` | `src/editor/utils/module.ts` | ✅ Exists | - |
| `editor/utils/promotion.js` | `src/editor/utils/promotion.ts` | ❌ Missing | LOW |
| `editor/utils/notice-bar.js` | `src/editor/utils/notice-bar.ts` | ❌ Missing | LOW |
| `editor/utils/control-conditions.js` | `src/editor/utils/control-conditions.ts` | ❌ Missing | MED |
| `editor/utils/font-variables.js` | `src/editor/utils/font-variables.ts` | ❌ Missing | LOW |

### Editor Views

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/views/controls-stack.js` | `src/editor/views/controls-stack.ts` | ✅ Exists | - |
| `editor/views/add-section/*` | `src/editor/views/add-section/` | ❌ Missing | MED |

### Editor Introduction System

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `editor/introduction-tooltips/manager.js` | `src/editor/introduction/manager.ts` | ❌ Missing | LOW |
| `editor/introduction-tooltips/tooltips/*` | `src/editor/introduction/tooltips/` | ❌ Missing | LOW |

## Admin System

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `admin/beta-tester/*` | `src/admin/beta-tester/` | ❌ Missing | LOW |
| `admin/floating-elements/*` | `src/admin/floating-elements/` | ❌ Missing | LOW |
| `admin/hints/*` | `src/admin/hints/` | ❌ Missing | LOW |
| `admin/new-template/*` | `src/admin/new-template/` | ❌ Missing | MED |

## Utils System

| Original File | Target TypeScript File | Status | Priority |
|---------------|------------------------|---------|----------|
| `utils/*` | `src/utils/` | ✅ Partial | - |

## Summary Statistics

- **Total Original Files**: ~500 files
- **Current Type Files**: ~80 files
- **Coverage**: ~40%
- **Missing High Priority Files**: ~150
- **Missing Medium Priority Files**: ~100
- **Missing Low Priority Files**: ~150

## Next Steps Priority

1. **HIGH**: Module system, Document system, Container system, Data system, Regions
2. **MEDIUM**: Components (browser-import, template-library, settings), Controls, Utils
3. **LOW**: Introduction system, Admin system, Promotion utilities
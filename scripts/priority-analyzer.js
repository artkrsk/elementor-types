#!/usr/bin/env node

/**
 * Elementor Priority Analysis
 * Identifies the most critical missing type definitions
 */

const fs = require("fs");
const path = require("path");

class ElementorPriorityAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.jsCodebasePath = path.join(this.projectRoot, "elementor-dev-js");
    this.typesPath = path.join(this.projectRoot, "src");
  }

  async analyze() {
    console.log("🎯 Identifying High-Priority Missing Types...\n");

    const priorities = {
      critical: [],
      high: [],
      medium: [],
      low: [],
    };

    // Critical: Core element types
    priorities.critical.push(...(await this.analyzeElementTypes()));

    // Critical: Core controls
    priorities.critical.push(...(await this.analyzeCoreControls()));

    // High: Essential managers
    priorities.high.push(...(await this.analyzeManagers()));

    // High: Common handlers
    priorities.high.push(...(await this.analyzeCommonHandlers()));

    // Medium: Additional controls
    priorities.medium.push(...(await this.analyzeAdditionalControls()));

    // Medium: Editor components
    priorities.medium.push(...(await this.analyzeEditorComponents()));

    this.printPriorityReport(priorities);
    this.generateActionPlan(priorities);

    return priorities;
  }

  async analyzeElementTypes() {
    const missing = [];
    const elementsPath = path.join(
      this.jsCodebasePath,
      "editor/elements/types"
    );

    if (!fs.existsSync(elementsPath)) {
      return missing;
    }

    // Check if Container element is properly typed
    const containerFile = path.join(elementsPath, "container.js");
    if (fs.existsSync(containerFile)) {
      const content = fs.readFileSync(containerFile, "utf8");
      const tsElements = path.join(this.typesPath, "editor/elements.ts");
      const tsContent = fs.readFileSync(tsElements, "utf8");

      // Check for advanced container methods
      if (
        content.includes("getEmptyView") &&
        !tsContent.includes("getEmptyView")
      ) {
        missing.push({
          type: "Container Element - EmptyView method",
          file: "editor/elements.ts",
          reason: "Container getEmptyView method not fully typed",
          impact: "Container widgets cannot be properly typed",
        });
      }
    }

    return missing;
  }

  async analyzeCoreControls() {
    const missing = [];
    const controlsPath = path.join(this.jsCodebasePath, "editor/controls");
    const tsControlsPath = path.join(this.typesPath, "editor/controls");

    const coreControls = [
      "base.js",
      "select.js",
      "text.js",
      "number.js",
      "color.js",
      "media.js",
      "slider.js",
      "dimensions.js",
      "typography.js",
      "repeater.js",
    ];

    for (const control of coreControls) {
      const controlPath = path.join(controlsPath, control);
      if (!fs.existsSync(controlPath)) continue;

      const controlName = path.basename(control, ".js");
      const tsFiles = fs.existsSync(tsControlsPath)
        ? fs.readdirSync(tsControlsPath)
        : [];

      const hasTSDefinition = tsFiles.some(
        (file) =>
          file.includes(controlName) ||
          path.basename(file, ".ts") === controlName
      );

      if (!hasTSDefinition) {
        missing.push({
          type: `${controlName} Control`,
          file: `editor/controls/${controlName}.ts`,
          reason: `Missing type definition for ${controlName} control`,
          impact: "Cannot properly type widget control schemas",
        });
      }
    }

    return missing;
  }

  async analyzeManagers() {
    const missing = [];
    const managersToCheck = [
      {
        js: "editor/elements/manager.js",
        ts: "editor/managers.ts",
        name: "ElementsManager",
      },
      {
        js: "frontend/documents-manager.js",
        ts: "frontend/managers.ts",
        name: "DocumentsManager",
      },
      {
        js: "frontend/elements-handlers-manager.js",
        ts: "frontend/managers.ts",
        name: "ElementsHandlersManager",
      },
    ];

    for (const manager of managersToCheck) {
      const jsPath = path.join(this.jsCodebasePath, manager.js);
      const tsPath = path.join(this.typesPath, manager.ts);

      if (fs.existsSync(jsPath)) {
        const jsContent = fs.readFileSync(jsPath, "utf8");

        if (fs.existsSync(tsPath)) {
          const tsContent = fs.readFileSync(tsPath, "utf8");

          // Check if manager is properly defined
          if (!tsContent.includes(manager.name)) {
            missing.push({
              type: manager.name,
              file: manager.ts,
              reason: `${manager.name} interface not found`,
              impact: "Core management functionality cannot be typed",
            });
          }
        } else {
          missing.push({
            type: manager.name,
            file: manager.ts,
            reason: `${manager.ts} file does not exist`,
            impact: "Core management functionality cannot be typed",
          });
        }
      }
    }

    return missing;
  }

  async analyzeCommonHandlers() {
    const missing = [];
    const handlersPath = path.join(this.jsCodebasePath, "frontend/handlers");
    const tsHandlersPath = path.join(this.typesPath, "frontend/handlers");

    const commonHandlers = [
      "base.js",
      "background-slideshow.js",
      "background-video.js",
      "counter.js",
      "progress.js",
      "tabs.js",
      "toggle.js",
      "video.js",
      "image-carousel.js",
    ];

    if (!fs.existsSync(handlersPath)) {
      return missing;
    }

    const tsFiles = fs.existsSync(tsHandlersPath)
      ? fs.readdirSync(tsHandlersPath)
      : [];

    for (const handler of commonHandlers) {
      const handlerPath = path.join(handlersPath, handler);
      if (!fs.existsSync(handlerPath)) continue;

      const handlerName = path.basename(handler, ".js");
      const hasTSDefinition = tsFiles.some(
        (file) =>
          file.includes(handlerName) ||
          path.basename(file, ".ts") === handlerName
      );

      if (!hasTSDefinition) {
        missing.push({
          type: `${handlerName} Handler`,
          file: `frontend/handlers/${handlerName}.ts`,
          reason: `Missing type definition for ${handlerName} handler`,
          impact: "Frontend widget behavior cannot be properly typed",
        });
      }
    }

    return missing;
  }

  async analyzeAdditionalControls() {
    const missing = [];
    const controlsPath = path.join(this.jsCodebasePath, "editor/controls");

    const additionalControls = [
      "wysiwyg.js",
      "code.js",
      "hidden.js",
      "section.js",
      "tab.js",
      "popover-toggle.js",
      "switcher.js",
      "choose.js",
      "icons.js",
      "gallery.js",
      "url.js",
      "font.js",
    ];

    // Similar analysis to core controls but with medium priority
    for (const control of additionalControls) {
      const controlPath = path.join(controlsPath, control);
      if (fs.existsSync(controlPath)) {
        const controlName = path.basename(control, ".js");
        missing.push({
          type: `${controlName} Control`,
          file: `editor/controls/${controlName}.ts`,
          reason: `Type definition needed for extended functionality`,
          impact: "Advanced control features cannot be typed",
        });
      }
    }

    return missing;
  }

  async analyzeEditorComponents() {
    const missing = [];
    const componentsPath = path.join(this.jsCodebasePath, "editor/components");

    if (!fs.existsSync(componentsPath)) {
      return missing;
    }

    const components = fs.readdirSync(componentsPath).filter((item) => {
      const itemPath = path.join(componentsPath, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const component of components) {
      missing.push({
        type: `${component} Component`,
        file: `editor/components/${component}.ts`,
        reason: `Editor component needs type definitions`,
        impact: "Editor functionality cannot be extended with proper typing",
      });
    }

    return missing;
  }

  printPriorityReport(priorities) {
    console.log("📊 ELEMENTOR TYPES PRIORITY ANALYSIS");
    console.log("=".repeat(60));

    this.printPrioritySection(
      "🔴 CRITICAL",
      priorities.critical,
      "These types are essential for basic Elementor development"
    );

    this.printPrioritySection(
      "🟠 HIGH",
      priorities.high,
      "Important for most Elementor development workflows"
    );

    this.printPrioritySection(
      "🟡 MEDIUM",
      priorities.medium,
      "Needed for advanced features and complete coverage"
    );

    this.printPrioritySection(
      "🟢 LOW",
      priorities.low,
      "Nice to have for comprehensive typing"
    );
  }

  printPrioritySection(title, items, description) {
    if (items.length === 0) return;

    console.log(`\n${title} PRIORITY (${items.length} items)`);
    console.log(description);
    console.log("-".repeat(40));

    items.slice(0, 5).forEach((item, index) => {
      console.log(`${index + 1}. ${item.type}`);
      console.log(`   File: ${item.file}`);
      console.log(`   Impact: ${item.impact}`);
      console.log("");
    });

    if (items.length > 5) {
      console.log(`   ... and ${items.length - 5} more items`);
    }
  }

  generateActionPlan(priorities) {
    console.log("\n📋 RECOMMENDED ACTION PLAN");
    console.log("=".repeat(60));

    let step = 1;

    if (priorities.critical.length > 0) {
      console.log(`\n${step}. PHASE 1 - Critical Foundation (Immediate)`);
      console.log("   • Implement core element type definitions");
      console.log("   • Add essential control type definitions");
      console.log("   • Create base manager interfaces");
      console.log(`   • Target: ${priorities.critical.length} critical items`);
      step++;
    }

    if (priorities.high.length > 0) {
      console.log(`\n${step}. PHASE 2 - High Priority (1-2 weeks)`);
      console.log("   • Complete handler type definitions");
      console.log("   • Extend manager functionality");
      console.log("   • Add common component types");
      console.log(`   • Target: ${priorities.high.length} high priority items`);
      step++;
    }

    if (priorities.medium.length > 0) {
      console.log(`\n${step}. PHASE 3 - Medium Priority (3-4 weeks)`);
      console.log("   • Complete control system typing");
      console.log("   • Add editor component definitions");
      console.log("   • Implement advanced features");
      console.log(
        `   • Target: ${priorities.medium.length} medium priority items`
      );
      step++;
    }

    console.log(`\n🎯 SUCCESS METRICS:`);
    console.log("   • Phase 1 completion: 60-70% coverage");
    console.log("   • Phase 2 completion: 80-85% coverage");
    console.log("   • Phase 3 completion: 90-95% coverage");

    console.log(`\n🔧 NEXT STEPS:`);
    console.log("   1. Create TypeScript verification tests");
    console.log("   2. Implement critical types first");
    console.log("   3. Test with real Elementor development scenarios");
    console.log("   4. Iterate based on developer feedback");
  }
}

// Run the analysis if this script is executed directly
if (require.main === module) {
  const analyzer = new ElementorPriorityAnalyzer();
  analyzer.analyze().catch(console.error);
}

module.exports = ElementorPriorityAnalyzer;

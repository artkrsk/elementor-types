#!/usr/bin/env node

/**
 * Elementor Types Coverage Analyzer
 *
 * This script analyzes the coverage of TypeScript type definitions
 * against the actual Elementor JavaScript codebase to identify gaps.
 */

const fs = require("fs");
const path = require("path");

class ElementorCoverageAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.jsCodebasePath = path.join(this.projectRoot, "elementor-dev-js");
    this.typesPath = path.join(this.projectRoot, "src");
    this.coverageReport = {
      timestamp: new Date().toISOString(),
      summary: {
        totalJSFiles: 0,
        coveredFiles: 0,
        uncoveredFiles: 0,
        partialCoverage: 0,
        coveragePercentage: 0,
      },
      modules: {},
      missing: {
        files: [],
        classes: [],
        methods: [],
        types: [],
      },
      recommendations: [],
    };
  }

  /**
   * Main analysis entry point
   */
  async analyze() {
    console.log("🔍 Starting Elementor Types Coverage Analysis...\n");

    // Analyze major modules
    await this.analyzeModule("admin", "Admin");
    await this.analyzeModule("editor", "Editor");
    await this.analyzeModule("frontend", "Frontend");
    await this.analyzeModule("utils", "Utils");
    await this.analyzeModule("modules", "Core");

    // Special analysis for complex systems
    await this.analyzeElementsSystem();
    await this.analyzeControlsSystem();
    await this.analyzeHandlersSystem();

    this.calculateSummary();
    this.generateRecommendations();
    this.printReport();
    this.saveReport();

    return this.coverageReport;
  }

  /**
   * Analyze a specific module directory
   */
  async analyzeModule(jsDir, tsNamespace) {
    const jsModulePath = path.join(this.jsCodebasePath, jsDir);
    const tsModulePath = path.join(this.typesPath, jsDir.toLowerCase());

    if (!fs.existsSync(jsModulePath)) {
      console.log(`⚠️  JS module not found: ${jsDir}`);
      return;
    }

    console.log(`📂 Analyzing ${jsDir} module...`);

    const jsFiles = this.findJSFiles(jsModulePath);
    const tsFiles = fs.existsSync(tsModulePath)
      ? this.findTSFiles(tsModulePath)
      : [];

    const moduleReport = {
      jsFiles: jsFiles.length,
      tsFiles: tsFiles.length,
      covered: [],
      missing: [],
      partial: [],
      coverage: 0,
    };

    // Analyze each JS file for coverage
    for (const jsFile of jsFiles) {
      const analysis = await this.analyzeFile(jsFile, tsFiles, tsNamespace);

      if (analysis.covered) {
        moduleReport.covered.push(analysis);
      } else if (analysis.partial) {
        moduleReport.partial.push(analysis);
      } else {
        moduleReport.missing.push(analysis);
        this.coverageReport.missing.files.push({
          file: jsFile,
          module: jsDir,
          reason: analysis.reason,
        });
      }
    }

    moduleReport.coverage = Math.round(
      ((moduleReport.covered.length + moduleReport.partial.length * 0.5) /
        jsFiles.length) *
        100
    );

    this.coverageReport.modules[jsDir] = moduleReport;
    this.coverageReport.summary.totalJSFiles += jsFiles.length;
    this.coverageReport.summary.coveredFiles += moduleReport.covered.length;
    this.coverageReport.summary.uncoveredFiles += moduleReport.missing.length;
    this.coverageReport.summary.partialCoverage += moduleReport.partial.length;
  }

  /**
   * Deep dive into the elements system
   */
  async analyzeElementsSystem() {
    console.log("🧱 Analyzing Elements System...");

    const elementsJSPath = path.join(this.jsCodebasePath, "editor/elements");
    const elementsTypes = path.join(this.typesPath, "editor/elements.ts");

    if (!fs.existsSync(elementsJSPath) || !fs.existsSync(elementsTypes)) {
      this.coverageReport.missing.types.push("Elements system not found");
      return;
    }

    // Check element types
    const elementTypesDir = path.join(elementsJSPath, "types");
    const elementFiles = fs
      .readdirSync(elementTypesDir)
      .filter((file) => file.endsWith(".js") && file !== "index.js");

    const tsContent = fs.readFileSync(elementsTypes, "utf8");

    const elementsReport = {
      totalElements: elementFiles.length,
      coveredElements: 0,
      missingElements: [],
    };

    for (const elementFile of elementFiles) {
      const elementName = path.basename(elementFile, ".js");
      const jsContent = fs.readFileSync(
        path.join(elementTypesDir, elementFile),
        "utf8"
      );

      // Extract class name and methods
      const classMatch = jsContent.match(/export default class (\w+)/);
      const className = classMatch ? classMatch[1] : elementName;

      // Check if this element is covered in TS
      const hasInterface =
        tsContent.includes(`interface ${className}`) ||
        tsContent.includes(`"${elementName.toLowerCase()}"`);

      if (hasInterface) {
        elementsReport.coveredElements++;
      } else {
        elementsReport.missingElements.push({
          file: elementFile,
          className,
          elementName,
        });
      }
    }

    this.coverageReport.modules.elements = elementsReport;
  }

  /**
   * Analyze the controls system
   */
  async analyzeControlsSystem() {
    console.log("🎛️ Analyzing Controls System...");

    const controlsJSPath = path.join(this.jsCodebasePath, "editor/controls");
    const controlsTypes = path.join(this.typesPath, "editor/controls");

    if (!fs.existsSync(controlsJSPath)) {
      return;
    }

    const controlFiles = fs
      .readdirSync(controlsJSPath)
      .filter((file) => file.endsWith(".js") && !file.includes("behavior"));

    const controlsReport = {
      totalControls: controlFiles.length,
      coveredControls: 0,
      missingControls: [],
    };

    const tsControlFiles = fs.existsSync(controlsTypes)
      ? fs.readdirSync(controlsTypes).filter((f) => f.endsWith(".ts"))
      : [];

    for (const controlFile of controlFiles) {
      const controlName = path.basename(controlFile, ".js");

      // Check if there's a corresponding TS file or definition
      const hasTSFile = tsControlFiles.some(
        (tsFile) =>
          tsFile.includes(controlName) ||
          path.basename(tsFile, ".ts") === controlName
      );

      if (hasTSFile) {
        controlsReport.coveredControls++;
      } else {
        controlsReport.missingControls.push(controlName);
      }
    }

    this.coverageReport.modules.controls = controlsReport;
  }

  /**
   * Analyze frontend handlers system
   */
  async analyzeHandlersSystem() {
    console.log("🎯 Analyzing Handlers System...");

    const handlersJSPath = path.join(this.jsCodebasePath, "frontend/handlers");
    const handlersTypes = path.join(this.typesPath, "frontend/handlers");

    if (!fs.existsSync(handlersJSPath)) {
      return;
    }

    const handlerFiles = this.findJSFiles(handlersJSPath);
    const tsHandlerFiles = fs.existsSync(handlersTypes)
      ? this.findTSFiles(handlersTypes)
      : [];

    const handlersReport = {
      totalHandlers: handlerFiles.length,
      coveredHandlers: 0,
      missingHandlers: [],
    };

    for (const handlerFile of handlerFiles) {
      const handlerName = path.basename(handlerFile, ".js");
      const relativePath = path.relative(handlersJSPath, handlerFile);

      // Check if handler is covered
      const isCovered = tsHandlerFiles.some((tsFile) => {
        const tsName = path.basename(tsFile, ".ts");
        return (
          tsName === handlerName ||
          tsFile.includes(handlerName) ||
          handlerName.includes(tsName)
        );
      });

      if (isCovered) {
        handlersReport.coveredHandlers++;
      } else {
        handlersReport.missingHandlers.push({
          file: relativePath,
          handler: handlerName,
        });
      }
    }

    this.coverageReport.modules.handlers = handlersReport;
  }

  /**
   * Analyze an individual file for type coverage
   */
  async analyzeFile(jsFilePath, tsFiles, tsNamespace) {
    const fileName = path.basename(jsFilePath, ".js");
    const jsContent = fs.readFileSync(jsFilePath, "utf8");

    const analysis = {
      file: jsFilePath,
      fileName,
      covered: false,
      partial: false,
      reason: "",
      details: {},
    };

    // Extract classes and key methods from JS file
    const classes = this.extractClasses(jsContent);
    const methods = this.extractMethods(jsContent);
    const exports = this.extractExports(jsContent);

    // Check if any TS file covers this functionality
    let hasTypeDefinition = false;
    let hasPartialCoverage = false;

    for (const tsFile of tsFiles) {
      const tsContent = fs.readFileSync(tsFile, "utf8");

      // Check for class coverage
      for (const className of classes) {
        if (
          tsContent.includes(className) ||
          tsContent.includes(`interface ${className}`) ||
          tsContent.includes(`class ${className}`)
        ) {
          hasTypeDefinition = true;
          break;
        }
      }

      // Check for export coverage
      for (const exportName of exports) {
        if (tsContent.includes(exportName)) {
          hasPartialCoverage = true;
        }
      }

      if (hasTypeDefinition) break;
    }

    if (hasTypeDefinition) {
      analysis.covered = true;
    } else if (hasPartialCoverage) {
      analysis.partial = true;
      analysis.reason = "Partially covered - some exports found";
    } else {
      analysis.reason = "No type definitions found";
    }

    analysis.details = { classes, methods, exports };
    return analysis;
  }

  /**
   * Extract class names from JavaScript content
   */
  extractClasses(content) {
    const classRegex = /(?:export\s+default\s+)?class\s+(\w+)/g;
    const classes = [];
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      classes.push(match[1]);
    }

    return classes;
  }

  /**
   * Extract method names from JavaScript content
   */
  extractMethods(content) {
    const methodRegex = /(\w+)\s*\([^)]*\)\s*\{/g;
    const methods = [];
    let match;

    while ((match = methodRegex.exec(content)) !== null) {
      if (!["if", "for", "while", "switch"].includes(match[1])) {
        methods.push(match[1]);
      }
    }

    return [...new Set(methods)]; // Remove duplicates
  }

  /**
   * Extract exports from JavaScript content
   */
  extractExports(content) {
    const exports = [];

    // Export default
    const defaultExport = content.match(/export\s+default\s+(\w+)/);
    if (defaultExport) {
      exports.push(defaultExport[1]);
    }

    // Named exports
    const namedExports = content.match(/export\s+\{([^}]+)\}/);
    if (namedExports) {
      const names = namedExports[1].split(",").map((name) => name.trim());
      exports.push(...names);
    }

    return exports;
  }

  /**
   * Find all JavaScript files in a directory
   */
  findJSFiles(dir) {
    const files = [];

    if (!fs.existsSync(dir)) {
      return files;
    }

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        files.push(...this.findJSFiles(itemPath));
      } else if (item.endsWith(".js")) {
        files.push(itemPath);
      }
    }

    return files;
  }

  /**
   * Find all TypeScript files in a directory
   */
  findTSFiles(dir) {
    const files = [];

    if (!fs.existsSync(dir)) {
      return files;
    }

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        files.push(...this.findTSFiles(itemPath));
      } else if (item.endsWith(".ts")) {
        files.push(itemPath);
      }
    }

    return files;
  }

  /**
   * Calculate summary statistics
   */
  calculateSummary() {
    const summary = this.coverageReport.summary;

    if (summary.totalJSFiles > 0) {
      summary.coveragePercentage = Math.round(
        ((summary.coveredFiles + summary.partialCoverage * 0.5) /
          summary.totalJSFiles) *
          100
      );
    }
  }

  /**
   * Generate recommendations based on analysis
   */
  generateRecommendations() {
    const recommendations = [];

    // High-priority missing elements
    if (this.coverageReport.modules.elements?.missingElements?.length > 0) {
      recommendations.push({
        priority: "HIGH",
        category: "Elements",
        message: `Missing ${this.coverageReport.modules.elements.missingElements.length} element type definitions`,
        action: "Add interfaces for missing element types",
      });
    }

    // Controls system gaps
    if (this.coverageReport.modules.controls?.missingControls?.length > 0) {
      recommendations.push({
        priority: "MEDIUM",
        category: "Controls",
        message: `Missing ${this.coverageReport.modules.controls.missingControls.length} control type definitions`,
        action: "Create type definitions for missing controls",
      });
    }

    // Low coverage modules
    Object.entries(this.coverageReport.modules).forEach(([module, report]) => {
      if (report.coverage && report.coverage < 80) {
        recommendations.push({
          priority: "MEDIUM",
          category: "Coverage",
          message: `${module} module has low coverage (${report.coverage}%)`,
          action: `Review and add missing type definitions for ${module}`,
        });
      }
    });

    // General recommendations
    if (this.coverageReport.summary.coveragePercentage < 90) {
      recommendations.push({
        priority: "LOW",
        category: "General",
        message: "Overall coverage is below 90%",
        action: "Focus on completing high-priority missing types",
      });
    }

    this.coverageReport.recommendations = recommendations;
  }

  /**
   * Print the coverage report to console
   */
  printReport() {
    console.log("\n" + "=".repeat(60));
    console.log("📊 ELEMENTOR TYPES COVERAGE REPORT");
    console.log("=".repeat(60));

    const summary = this.coverageReport.summary;
    console.log(`\n📈 SUMMARY:`);
    console.log(`   Total JS Files: ${summary.totalJSFiles}`);
    console.log(`   Covered Files: ${summary.coveredFiles}`);
    console.log(`   Partially Covered: ${summary.partialCoverage}`);
    console.log(`   Uncovered Files: ${summary.uncoveredFiles}`);
    console.log(`   Coverage: ${summary.coveragePercentage}%`);

    console.log(`\n📂 MODULE BREAKDOWN:`);
    Object.entries(this.coverageReport.modules).forEach(([module, report]) => {
      const status =
        report.coverage >= 90 ? "✅" : report.coverage >= 70 ? "🟡" : "❌";
      console.log(`   ${status} ${module}: ${report.coverage || "N/A"}%`);
    });

    if (this.coverageReport.recommendations.length > 0) {
      console.log(`\n💡 RECOMMENDATIONS:`);
      this.coverageReport.recommendations.forEach((rec, index) => {
        const priority =
          rec.priority === "HIGH"
            ? "🔴"
            : rec.priority === "MEDIUM"
            ? "🟡"
            : "🟢";
        console.log(`   ${priority} ${rec.message}`);
        console.log(`      → ${rec.action}`);
      });
    }

    console.log("\n" + "=".repeat(60));
  }

  /**
   * Save the detailed report to a file
   */
  saveReport() {
    const reportPath = path.join(this.projectRoot, "coverage-report.json");
    fs.writeFileSync(reportPath, JSON.stringify(this.coverageReport, null, 2));
    console.log(`📄 Detailed report saved to: ${reportPath}`);

    // Also create a markdown report
    this.saveMarkdownReport();
  }

  /**
   * Save a markdown version of the report
   */
  saveMarkdownReport() {
    const reportPath = path.join(this.projectRoot, "COVERAGE-REPORT.md");

    let markdown = `# Elementor Types Coverage Report\n\n`;
    markdown += `Generated: ${this.coverageReport.timestamp}\n\n`;

    // Summary
    markdown += `## Summary\n\n`;
    const summary = this.coverageReport.summary;
    markdown += `- **Total JS Files**: ${summary.totalJSFiles}\n`;
    markdown += `- **Covered Files**: ${summary.coveredFiles}\n`;
    markdown += `- **Partially Covered**: ${summary.partialCoverage}\n`;
    markdown += `- **Uncovered Files**: ${summary.uncoveredFiles}\n`;
    markdown += `- **Overall Coverage**: ${summary.coveragePercentage}%\n\n`;

    // Module breakdown
    markdown += `## Module Coverage\n\n`;
    markdown += `| Module | Coverage | Status |\n`;
    markdown += `|--------|----------|--------|\n`;

    Object.entries(this.coverageReport.modules).forEach(([module, report]) => {
      const status =
        report.coverage >= 90
          ? "✅ Excellent"
          : report.coverage >= 70
          ? "🟡 Good"
          : "❌ Needs Work";
      markdown += `| ${module} | ${report.coverage || "N/A"}% | ${status} |\n`;
    });

    // Recommendations
    if (this.coverageReport.recommendations.length > 0) {
      markdown += `\n## Recommendations\n\n`;
      this.coverageReport.recommendations.forEach((rec, index) => {
        const priority =
          rec.priority === "HIGH"
            ? "🔴"
            : rec.priority === "MEDIUM"
            ? "🟡"
            : "🟢";
        markdown += `### ${priority} ${rec.category}\n\n`;
        markdown += `**Issue**: ${rec.message}\n\n`;
        markdown += `**Action**: ${rec.action}\n\n`;
      });
    }

    fs.writeFileSync(reportPath, markdown);
    console.log(`📄 Markdown report saved to: ${reportPath}`);
  }
}

// Run the analysis if this script is executed directly
if (require.main === module) {
  const analyzer = new ElementorCoverageAnalyzer();
  analyzer.analyze().catch(console.error);
}

module.exports = ElementorCoverageAnalyzer;

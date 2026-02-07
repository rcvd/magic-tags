import type { OnloadArgs } from "roamjs-components/types";
import { generateCSS, injectCSS, removeCSS, MagicTagRule, IconTheme, migrateRules } from "./logic";
import MagicTagSettings from "./Settings";

/**
 * Entry point for the Roam extension. Called when the extension is loaded.
 * @param args - Arguments provided by Roam Research.
 */
function onload({ extensionAPI }: OnloadArgs) {
  try {
    const updateCSS = (rules: MagicTagRule[], theme: IconTheme) => {
      const css = generateCSS(rules, theme);
      injectCSS(css);
    };

    // 1. Settings Panel
    extensionAPI.settings.panel.create({
      tabTitle: "Magic Tags",
      settings: [
        {
          id: "rules",
          name: "Magic Tag Rules",
          description: "Define rules to replace tags with icons",
          action: {
            type: "reactComponent",
            component: () =>
              MagicTagSettings({
                extensionAPI,
                onUpdate: (rules, theme) => updateCSS(rules, theme),
              }),
          } as any,
        },
      ],
    });

    // 2. Initial CSS Injection
    const initialRules = (extensionAPI.settings.get("rules") as MagicTagRule[]) || [];
    const migratedRules = migrateRules(initialRules);
    const initialTheme = (extensionAPI.settings.get("theme") as IconTheme) || "blueprint";
    updateCSS(migratedRules, initialTheme);

    console.log("Magic Tags plugin loaded successfully!");
  } catch (error) {
    console.error("Error loading Magic Tags plugin:", error instanceof Error ? error.message : error);
  }
}

/**
 * Cleanup function for the Roam extension. Called when the extension is unloaded.
 */
function onunload() {
  try {
    // 4. Cleanup
    removeCSS();

    console.log("Magic Tags plugin unloaded successfully!");
  } catch (error) {
    console.error("Error unloading Magic Tags plugin:", error instanceof Error ? error.message : error);
  }
}

export default {
  onload,
  onunload,
};

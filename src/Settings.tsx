import React, { useState, useEffect } from "react";
import { Button, InputGroup, Intent, Card, Elevation, HTMLSelect } from "@blueprintjs/core";
import { MagicTagRule, BLUEPRINT_COLORS, IconTheme, migrateRules } from "./logic";
import IconPicker from "./IconPicker";

interface SettingsPanelProps {
  extensionAPI: any;
  onUpdate: (rules: MagicTagRule[], theme: IconTheme) => void;
}

const MagicTagSettings: React.FC<SettingsPanelProps> = ({ extensionAPI, onUpdate }) => {
  const [rules, setRules] = useState<MagicTagRule[]>([]);
  const [theme, setTheme] = useState<IconTheme>("blueprint");

  useEffect(() => {
    const savedRules = extensionAPI.settings.get("rules") as MagicTagRule[];
    if (savedRules) {
      setRules(migrateRules(savedRules));
    }
    const savedTheme = extensionAPI.settings.get("theme") as IconTheme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [extensionAPI]);

  const saveAll = (newRules: MagicTagRule[], newTheme: IconTheme) => {
    setRules(newRules);
    setTheme(newTheme);
    extensionAPI.settings.set("rules", newRules);
    extensionAPI.settings.set("theme", newTheme);
    onUpdate(newRules, newTheme);
  };

  const addRule = () => {
    const newRules: MagicTagRule[] = [...rules, { tag: "", icon: theme === "feather" ? "plus" : "add", color: BLUEPRINT_COLORS[0].name }];
    saveAll(newRules, theme);
  };

  const removeRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    saveAll(newRules, theme);
  };

  const updateRule = (index: number, updates: Partial<MagicTagRule>) => {
    const newRules = rules.map((rule, i) =>
      i === index ? { ...rule, ...updates } as MagicTagRule : rule
    );
    saveAll(newRules, theme);
  };

  const updateTheme = (newTheme: IconTheme) => {
    saveAll(rules, newTheme);
  };

  const exportSettings = () => {
    const data = { rules, theme };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "magictags-settings.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        if (data.rules && Array.isArray(data.rules)) {
          saveAll(migrateRules(data.rules as MagicTagRule[]), data.theme || "blueprint");
        } else {
          console.error("Invalid settings file format.");
        }
      } catch (error) {
        console.error("Error parsing settings file:", error);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const uniqueColorNames = Array.from(new Set(BLUEPRINT_COLORS.map(c => c.name)));

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ maxWidth: "200px", flex: "1 1 auto" }}>
          <label className="bp3-label">
            Icon Theme
            <HTMLSelect
              value={theme}
              onChange={(e) => updateTheme(e.target.value as IconTheme)}
              options={[
                { label: "Blueprint", value: "blueprint" },
                { label: "Feather (Lucide)", value: "feather" },
              ]}
              fill
            />
          </label>
        </div>
        <div style={{ display: "flex", gap: "10px", paddingBottom: "5px" }}>
          <Button
            icon="import"
            onClick={() => document.getElementById("import-settings-input")?.click()}
          >
            Import
          </Button>
          <input
            id="import-settings-input"
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={importSettings}
          />
          <Button
            icon="export"
            onClick={exportSettings}
          >
            Export
          </Button>
        </div>
      </div>

      {rules.map((rule, index) => (
        <Card
          key={index}
          elevation={Elevation.ZERO}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "10px",
            alignItems: "flex-end",
            padding: "10px",
            background: "transparent",
          }}
        >
          <div style={{ flex: "1 1 80px" }}>
            <label className="bp3-label" style={{ marginBottom: "5px", display: "block" }}>
              Tag Name
              <InputGroup
                placeholder="e.g. todo"
                value={rule.tag}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRule(index, { tag: e.target.value })}
                style={{ width: "100%", minWidth: "100%" }}
              />
            </label>
          </div>
          <div style={{ width: "40px" }}>
            <label className="bp3-label" style={{ marginBottom: "5px", display: "block" }}>
              Icon
              <IconPicker
                currentIcon={rule.icon}
                theme={theme}
                onChange={(hex) => updateRule(index, { icon: hex })}
              />
            </label>
          </div>
          <div style={{ width: "120px" }}>
            <label className="bp3-label" style={{ marginBottom: "5px", display: "block" }}>
              Color
              <HTMLSelect
                value={rule.color}
                onChange={(e) => updateRule(index, { color: e.target.value })}
                options={uniqueColorNames.map((name) => ({ label: name, value: name }))}
                fill
              />
            </label>
          </div>
          <div style={{ paddingBottom: "5px" }}>
            <Button
              icon="trash"
              intent={Intent.DANGER}
              minimal
              onClick={() => removeRule(index)}
            />
          </div>
        </Card>
      ))}
      <Button
        icon="add"
        intent={Intent.PRIMARY}
        onClick={addRule}
        style={{ marginTop: "10px" }}
      >
        Add Magic Tag Rule
      </Button>
    </div>
  );
};

export default MagicTagSettings;

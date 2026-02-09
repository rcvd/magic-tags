import { IconContents, IconNames } from "@blueprintjs/icons";
import lucideData from "lucide-static/font/info.json";
import FEATHER_FONT_URL from "lucide-static/font/lucide.woff2";

export const FEATHER_ICONS_LIST = Object.entries(lucideData).map(([name, info]) => ({
  name,
  hex: (info as any).encodedCode.replace("\\", ""),
}));

export type IconTheme = "blueprint" | "feather";

export interface MagicTagRule {
  tag: string;
  icon: string;
  color: string;
}

export const ICONS_LIST = Object.entries(IconNames)
  .filter(([key]) => (IconContents as any)[key] !== undefined)
  .map(([key, name]) => ({
    name,
    hex: (IconContents as any)[key].charCodeAt(0).toString(16).toLowerCase().padStart(4, "0"),
  }));

const BLUEPRINT_NAME_TO_HEX: Record<string, string> = Object.fromEntries(
  ICONS_LIST.map((icon) => [icon.name, icon.hex])
);

const FEATHER_NAME_TO_HEX: Record<string, string> = Object.fromEntries(
  FEATHER_ICONS_LIST.map((icon) => [icon.name, icon.hex])
);

const STYLE_ID = "magictags-styles";

export interface ColorDefinition {
  name: string;
  appearance: "light" | "dark";
  value: string;
}

export const BLUEPRINT_COLORS: ColorDefinition[] = [
  { name: "Black/White", appearance: "light", value: "#10161A" },
  { name: "Black/White", appearance: "dark", value: "#ffffff" },
  { name: "Blue", appearance: "light", value: "#137cbd" },
  { name: "Blue", appearance: "dark", value: "#48aff0" },
  { name: "Green", appearance: "light", value: "#0f9960" },
  { name: "Green", appearance: "dark", value: "#3dcc91" },
  { name: "Orange", appearance: "light", value: "#d9822b" },
  { name: "Orange", appearance: "dark", value: "#ffb366" },
  { name: "Red", appearance: "light", value: "#db3737" },
  { name: "Red", appearance: "dark", value: "#ff7373" },
  { name: "Grey", appearance: "light", value: "#5c7080" },
  { name: "Grey", appearance: "dark", value: "#a7b6c2" },
  { name: "Vermilion", appearance: "light", value: "#d13913" },
  { name: "Vermilion", appearance: "dark", value: "#ff8566" },
  { name: "Rose", appearance: "light", value: "#c23030" },
  { name: "Rose", appearance: "dark", value: "#ff8080" },
  { name: "Violet", appearance: "light", value: "#8550e5" },
  { name: "Violet", appearance: "dark", value: "#c2a5f0" },
  { name: "Indigo", appearance: "light", value: "#5642a6" },
  { name: "Indigo", appearance: "dark", value: "#ad99ff" },
  { name: "Cobalt", appearance: "light", value: "#1f4b99" },
  { name: "Cobalt", appearance: "dark", value: "#669eff" },
  { name: "Turquoise", appearance: "light", value: "#008075" },
  { name: "Turquoise", appearance: "dark", value: "#00b3a4" },
  { name: "Forest", appearance: "light", value: "#1d7324" },
  { name: "Forest", appearance: "dark", value: "#43bf4d" },
  { name: "Lime", appearance: "light", value: "#728c23" },
  { name: "Lime", appearance: "dark", value: "#a5d42f" },
  { name: "Gold", appearance: "light", value: "#a67908" },
  { name: "Gold", appearance: "dark", value: "#d9a514" },
  { name: "Sepia", appearance: "light", value: "#63411e" },
  { name: "Sepia", appearance: "dark", value: "#91683e" },
];

export const getIconHex = (icon: string, theme: IconTheme = "blueprint"): string => {
  if (theme === "feather") {
    if (FEATHER_NAME_TO_HEX[icon]) {
      return FEATHER_NAME_TO_HEX[icon];
    }
    if (/^[0-9a-f]{4}$/i.test(icon)) {
      return icon;
    }
    return "e13d"; // Default to 'plus' icon in feather (lucide)
  }

  // Priority 1: Check if it's a known icon name
  if (BLUEPRINT_NAME_TO_HEX[icon]) {
    return BLUEPRINT_NAME_TO_HEX[icon];
  }
  // Priority 2: If not an icon name, check if it looks like a hex code (backward compat)
  if (/^[0-9a-f]{4}$/i.test(icon)) {
    return icon;
  }
  return "e63e"; // Default to 'add' icon if not found
};

export const generateCSS = (rules: MagicTagRule[], theme: IconTheme = "blueprint"): string => {
  const featherFontFace = `
@font-face {
  font-family: 'feather';
  src: url('${FEATHER_FONT_URL}') format('woff2');
  font-weight: normal;
  font-style: normal;
}
`;

  const fontSubstitute = theme === "feather" ? '"feather"' : '"Icons16", "Icons20", "blueprint-icons-16"';

  const css = rules
    .map((rule) => {
      // Roam tags can be [data-tag="tagname"]
      // We hide the text by setting font-size to 0 and show the icon in ::before
      const tagSelector = `span.rm-page-ref--tag[data-tag="${rule.tag}"]`;
      const iconHex = getIconHex(rule.icon, theme);
      
      // Attempt to resolve color name from hex if needed (backward compatibility)
      let colorName = rule.color;
      const colorMatch = BLUEPRINT_COLORS.find(c => c.value.toLowerCase() === rule.color.toLowerCase());
      if (colorMatch) {
        colorName = colorMatch.name;
      }

      const colorDefs = BLUEPRINT_COLORS.filter(c => c.name === colorName);
      const lightThemeColor = colorDefs.find(c => c.appearance === "light")?.value || rule.color;
      const darkThemeColor = colorDefs.find(c => c.appearance === "dark")?.value || lightThemeColor;

      return `
        ${tagSelector} {
          font-size: 0 !important;
          border: none;
          background: none;
          padding: 0;
          display: inline-block;
          height: 14px;
          vertical-align: top;
        }
        ${tagSelector}::before {
          font-family: ${fontSubstitute};
          content: "\\${iconHex}";
          font-size: 14px;
          color: ${lightThemeColor};
          visibility: visible;
          cursor: pointer;
        }
        .rs-dark ${tagSelector}::before {
          color: ${darkThemeColor};
        }
        @media (prefers-color-scheme: dark) {
          ${tagSelector}::before {
            color: ${darkThemeColor};
          }
        }
      `;
    })
    .join("\n");

  return (theme === "feather" ? featherFontFace : "") + "\n" + css;
};

export const migrateRules = (rules: MagicTagRule[]): MagicTagRule[] => {
  return rules.map((rule) => {
    // If the color is already a name in BLUEPRINT_COLORS, we're good
    if (BLUEPRINT_COLORS.some((c) => c.name === rule.color)) {
      return rule;
    }
    // Otherwise, try to find a name by hex value
    const match = BLUEPRINT_COLORS.find(
      (c) => c.value.toLowerCase() === rule.color.toLowerCase()
    );
    if (match) {
      return { ...rule, color: match.name };
    }
    return rule;
  });
};

export const injectCSS = (css: string) => {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement;
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.innerHTML = css;
};

export const removeCSS = () => {
  const style = document.getElementById(STYLE_ID);
  if (style) {
    style.remove();
  }
};

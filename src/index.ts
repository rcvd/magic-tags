import type { OnloadArgs } from "roamjs-components/types";
import { feather_icons } from "./MagicTags/feather-icons";
import { blueprint_icons } from "./MagicTags/blueprint-icons";
import { items, icon_lookup } from "./MagicTags/icons";
import { color_scheme } from "./MagicTags/colors";

var settings: { [key: string]: string } = {
    "icon-theme": "Blueprint",
    "mt-1-word": "love",
    "mt-1-icon": "heart",
    "mt-1-color": "red",
    "mt-1-lightness": "medium",
    "mt-2-word": "bookmark",
    "mt-2-icon": "bookmark",
    "mt-2-color": "gray",
    "mt-2-lightness": "medium",
    "mt-3-word": "",
    "mt-3-icon": "",
    "mt-3-color": "",
    "mt-3-lightness": "",
    "mt-4-word": "",
    "mt-4-icon": "",
    "mt-4-color": "",
    "mt-4-lightness": "",
    "mt-5-word": "",
    "mt-5-icon": "",
    "mt-5-color": "",
    "mt-5-lightness": "",
    "mt-6-word": "",
    "mt-6-icon": "",
    "mt-6-color": "",
    "mt-6-lightness": "",
    "mt-7-word": "",
    "mt-7-icon": "",
    "mt-7-color": "",
    "mt-7-lightness": "",
    "mt-8-word": "",
    "mt-8-icon": "",
    "mt-8-color": "",
    "mt-8-lightness": "",
    "mt-9-word": "",
    "mt-9-icon": "",
    "mt-9-color": "",
    "mt-9-lightness": "",
    "mt-10-word": "",
    "mt-10-icon": "",
    "mt-10-color": "",
    "mt-10-lightness": "",
    "mt-11-word": "",
    "mt-11-icon": "",
    "mt-11-color": "",
    "mt-11-lightness": "",
    "mt-12-word": "",
    "mt-12-icon": "",
    "mt-12-color": "",
    "mt-12-lightness": "",
    "mt-13-word": "",
    "mt-13-icon": "",
    "mt-13-color": "",
    "mt-13-lightness": "",
    "mt-14-word": "",
    "mt-14-icon": "",
    "mt-14-color": "",
    "mt-14-lightness": "",
    "mt-15-word": "",
    "mt-15-icon": "",
    "mt-15-color": "",
    "mt-15-lightness": "",
    "mt-16-word": "",
    "mt-16-icon": "",
    "mt-16-color": "",
    "mt-16-lightness": "",
    "mt-17-word": "",
    "mt-17-icon": "",
    "mt-17-color": "",
    "mt-17-lightness": "",
    "mt-18-word": "",
    "mt-18-icon": "",
    "mt-18-color": "",
    "mt-18-lightness": "",
    "mt-19-word": "",
    "mt-19-icon": "",
    "mt-19-color": "",
    "mt-19-lightness": "",
    "mt-20-word": "",
    "mt-20-icon": "",
    "mt-20-color": "",
    "mt-20-lightness": "",
    "mt-21-word": "",
    "mt-21-icon": "",
    "mt-21-color": "",
    "mt-21-lightness": "",
    "mt-22-word": "",
    "mt-22-icon": "",
    "mt-22-color": "",
    "mt-22-lightness": "",
    "mt-23-word": "",
    "mt-23-icon": "",
    "mt-23-color": "",
    "mt-23-lightness": "",
    "mt-24-word": "",
    "mt-24-icon": "",
    "mt-24-color": "",
    "mt-24-lightness": "",
    "mt-25-word": "",
    "mt-25-icon": "",
    "mt-25-color": "",
    "mt-25-lightness": "",
  },
  extAPI: OnloadArgs["extensionAPI"];

function createCSS(id: number) {
  var word: String,
    icon: String,
    color: String,
    lightness: String,
    lightnessDark: String,
    line_height: String,
    mode: Number,
    css: String;

  word = settings["mt-" + id + "-word"].toString();
  color = settings["mt-" + id + "-color"].toString();
  icon = settings["mt-" + id + "-icon"].toString();
  lightness = settings["mt-" + id + "-lightness"].toString();
  line_height = "26px";
  
  mode = 0;
  
  /* Try to find Roam Studio and detect mode settings */
  if (document.getElementsByClassName("roamstudio-dm-toggle bp3-icon-clean").length != 0) {
    console.log("Roam Studio with Auto Mode detected");
    mode = 1;
  }
  else if (document.getElementsByClassName("roamstudio-dm-toggle bp3-icon-flash").length != 0) {
    console.log("Roam Studio with Light Mode detected");
    mode = 2;
  }
  else if (document.getElementsByClassName("roamstudio-dm-toggle bp3-icon-moon").length != 0) {
    console.log("Roam Studio with Dark Mode detected");
    mode = 3;
  }

  if (document.getElementById("roamstudio-css-system")) {
    line_height = "calc(var(--fs-main) + 8px)";
  }

  if (word != "" && icon != "" && color != "" && color != "") {
    if (settings["icon-theme"] == "Feather") {
      icon = feather_icons[icon_lookup[settings["mt-" + id + "-icon"]][1]];
    } else {
      icon = blueprint_icons[icon_lookup[settings["mt-" + id + "-icon"]][0]];
    }

    switch (lightness) {
      case "lightest":
        lightness = "100";
        break;
      case "lighter":
        lightness = "200";
        break;
      case "light":
        lightness = "300";
        break;
      case "medium":
        lightness = "500";
        break;
      case "dark":
        lightness = "600";
        break;
      case "darker":
        lightness = "800";
        break;
      case "darkest":
        lightness = "900";
        break;
    }
    
    lightnessDark = (1000 - +lightness).toString();
    
    if (mode == 0 || mode == 2) {
      css = `.rm-page-ref[data-tag="${word}"] {
        display: inline-block;
        font-size: 0px;
        background: transparent!important;
        padding: 0!important;
        height: 18px;
      }
      
      .rm-page-ref[data-tag="${word}"]::after {
        width: 18px;
        height: 18px;
        visibility: visible;
        display: inline-block;
        line-height: ${line_height};
        content: "";
        background-color: var(--cl-${color}-${lightness});
        margin-bottom: -4px;
        mask: url("${icon}") no-repeat 50% 50%;
        -webkit-mask: url("${icon}") no-repeat 50% 50%;
        mask-size: cover;
        -webkit-mask-size: cover;
      }`;
    }
    
    if (mode == 1 ) {
      css = `.rm-page-ref[data-tag="${word}"] {
        display: inline-block;
        font-size: 0px;
        background: transparent!important;
        padding: 0!important;
        height: 18px;
      }
      
      .rm-page-ref[data-tag="${word}"]::after {
        width: 18px;
        height: 18px;
        visibility: visible;
        display: inline-block;
        line-height: ${line_height};
        content: "";
        background-color: var(--cl-${color}-${lightness});
        margin-bottom: -4px;
        mask: url("${icon}") no-repeat 50% 50%;
        -webkit-mask: url("${icon}") no-repeat 50% 50%;
        mask-size: cover;
        -webkit-mask-size: cover;
      }
      
      @media (prefers-color-scheme: dark) {
        .rm-page-ref[data-tag="${word}"]::after {
          background-color: var(--cl-${color}-${lightnessDark});
        }
      }`;
    }
    
    if (mode == 3 ) {
      css = `.rm-page-ref[data-tag="${word}"] {
        display: inline-block;
        font-size: 0px;
        background: transparent!important;
        padding: 0!important;
        height: 18px;
      }
      
      .rm-page-ref[data-tag="${word}"]::after {
        width: 18px;
        height: 18px;
        visibility: visible;
        display: inline-block;
        line-height: ${line_height};
        content: "";
        background-color: var(--cl-${color}-${lightnessDark});
        margin-bottom: -4px;
        mask: url("${icon}") no-repeat 50% 50%;
        -webkit-mask: url("${icon}") no-repeat 50% 50%;
        mask-size: cover;
        -webkit-mask-size: cover;
      }`;
    }

    return css;
  }
}

function learnSpells() {
  console.log("Learning spells");
  
  addColorScheme();

  if (document.getElementById("magic-tags")) {
    document.getElementById("magic-tags").remove();
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  var i: number;
  style.id = "magic-tags";
  style.textContent = "";

  for (i = 1; i <= 25; i++) {
    if (settings["mt-" + i + "-word"] != "") {
      style.textContent = style.textContent + createCSS(i);
    }
  }
  head.appendChild(style);
  createSettings(extAPI);
}

function createSettings(extensionAPI: any) {
  const mySettings = [];

  console.log("Creating settings");

  mySettings.push({
    id: "icon-theme",
    name: "Icon Theme",
    description: "Select your icon theme",
    action: {
      type: "select",
      items: ["Blueprint", "Feather"],
      onChange: (evt) => {
        settings["icon-theme"] = evt.toString();
        learnSpells();
      },
    },
  });

  for (let i = 0; i < 25; i++) {
    mySettings.push({
      id: "mt-" + i + "-word",
      name: "Magic Word",
      description: "Select magic word",
      action: {
        type: "input",
        placeholder: "word",
        onChange: (evt) => {
          settings["mt-" + i + "-word"] = evt.target.value;
          learnSpells();
        },
      },
    });

    mySettings.push({
      id: "mt-" + i + "-icon",
      name: "Icon",
      description: "Select icon",
      action: {
        type: "select",
        items: items,
        onChange: (evt) => {
          settings["mt-" + i + "-icon"] = evt.toString();
          learnSpells();
        },
      },
    });

    mySettings.push({
      id: "mt-" + i + "-color",
      name: "Color",
      description: "Select color",
      action: {
        type: "select",
        items: [
          "rose",
          "pink",
          "fuchsia",
          "purple",
          "violet",
          "indigo",
          "blue",
          "sky",
          "cyan",
          "teal",
          "emerald",
          "green",
          "lime",
          "yellow",
          "amber",
          "orange",
          "red",
          "gray",
          "black",
          "white",
        ],
        onChange: (evt) => {
          settings["mt-" + i + "-color"] = evt.toString();
          learnSpells();
        },
      },
    });

    mySettings.push({
      id: "mt-" + i + "-lightness",
      name: "Lightness",
      description: "Select color lightness",
      action: {
        type: "select",
        items: [
          "lightest",
          "lighter",
          "light",
          "medium",
          "dark",
          "darker",
          "darkest",
        ],
        onChange: (evt) => {
          settings["mt-" + i + "-lightness"] = evt.toString();
          learnSpells();
        },
      },
    });
  }

  extensionAPI.settings.panel.create({
    tabTitle: "Magic Tags",
    settings: mySettings,
  });
}

function addColorScheme() {
  if (document.getElementById("magic-tags-colors")) {
    document.getElementById("magic-tags-colors").remove();
  }

  if (!document.getElementById("roamstudio-css-system")) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    var i: number;
    style.id = "magic-tags-colors";
    style.textContent = color_scheme;
  
    head.appendChild(style);
  }
}

function setSettingDefault(
  extensionAPI: any,
  settingId: any,
  settingDefault: any
) {
  let storedSetting = extensionAPI.settings.get(settingId);
  if (null == storedSetting)
    extensionAPI.settings.set(settingId, settingDefault);
  return storedSetting || settingDefault;
}

function onload({ extensionAPI }: OnloadArgs) {
  extAPI = extensionAPI;
  console.log("Loaded Magic Tags");

  for (const item in settings) {
    settings[item] = setSettingDefault(extensionAPI, item, settings[item]);
    console.log("Setting: " + item);
  }

  addColorScheme();

  learnSpells();
}

function onunload() {
  console.log("Unloaded Magic Tags");

  if (document.getElementById("magic-tags")) {
    document.getElementById("magic-tags").remove();
  }

  if (document.getElementById("magic-tags-colors")) {
    document.getElementById("magic-tags-colors").remove();
  }
}

export default {
  onload: onload,
  onunload: onunload,
};

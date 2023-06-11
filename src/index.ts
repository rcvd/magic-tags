import type { OnloadArgs } from "roamjs-components/types";
import {feather_icons} from "./MagicTags/feather-icons";
import {blueprint_icons} from "./MagicTags/blueprint-icons";
import {items, icon_lookup} from "./MagicTags/icons";
import {color_scheme} from "./MagicTags/colors";

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
  var word: String, icon: String, color: String, lightness: String, line_height: String;
    
  word = settings["mt-"+id+"-word"].toString();
  color = settings["mt-"+id+"-color"].toString();
  icon =settings["mt-"+id+"-icon"].toString();
  lightness = settings["mt-"+id+"-lightness"].toString();
  line_height = "26px";
  
  if (document.getElementById("roamstudio-css-system")) {
    line_height = "calc(var(--fs-main) + 8px)";
  }
    
  if (word != "" && icon != "" && color != "" && color != "") {
    if (settings["icon-theme"] == "Feather") {
      icon = feather_icons[icon_lookup[settings["mt-"+id+"-icon"]][1]];
    }
    else {
      icon = blueprint_icons[icon_lookup[settings["mt-"+id+"-icon"]][0]];
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
        
    return `.rm-page-ref[data-tag="${word}"] {
      display: inline-block;
      font-size: 0px;
    }
    
    .rm-page-ref[data-tag="${word}"] {
      width: 18px;
      height: 18px;
      visibility: visible;
      display: inline-block;
      line-height: ${line_height};
      content: "";
      background-color: var(--cl-${color}-${lightness}, ${color});
      margin-bottom: -4px;
      padding-top: 2px;
      padding-bottom: 2px;
      mask: url("${icon}") no-repeat 50% 50%;
      -webkit-mask: url("${icon}") no-repeat 50% 50%;
      mask-size: cover;
      -webkit-mask-size: cover;
    }`;
  }
}

function learnSpells() {
  console.log("Learning spells"); 
  
  if (document.getElementById("magic-tags")) {
    document.getElementById("magic-tags").remove();
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  var i: number;
  style.id = "magic-tags";
  style.textContent = "";
  
  for (i=1; i <= 25; i++) {
    if (settings["mt-"+i+"-word"] != "") {
      style.textContent = style.textContent + createCSS(i);
    }
  }
  head.appendChild(style);
  createSettings(extAPI);
}

function createSettings(extensionAPI: any) {
  extensionAPI.settings.panel.create({
    tabTitle: "Magic Tags",
    settings: [
      {
        id: "icon-theme",
        name: "Icon Theme",
        description: "Select your icon theme",
        action: {
          type: "select",
          items: [
            "Blueprint",
            "Feather"
          ],
          onChange: (evt) => {
            settings["icon-theme"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-1-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-1-word"] = evt.target.value;
            console.log(settings["mt-1-word"]);
            learnSpells();
          },
        },
      },
      {
        id: "mt-1-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-1-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-1-color",
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
            settings["mt-1-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-1-lightness",
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
            settings["mt-1-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-2-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-2-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-2-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-2-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-2-color",
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
            settings["mt-2-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-2-lightness",
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
            settings["mt-2-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-3-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-3-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-3-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-3-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-3-color",
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
            settings["mt-3-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-3-lightness",
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
            settings["mt-3-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-4-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-4-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-4-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-4-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-4-color",
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
            settings["mt-4-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-4-lightness",
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
            settings["mt-4-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-5-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-5-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-5-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-5-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-5-color",
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
            settings["mt-5-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-5-lightness",
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
            settings["mt-5-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-6-word",
        name: "Magic Word",
        description: "Select magic word (omit the #)",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-6-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-6-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-6-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-6-color",
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
            settings["mt-6-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-6-lightness",
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
            settings["mt-6-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-7-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-7-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-7-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-7-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-7-color",
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
            settings["mt-7-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-7-lightness",
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
            settings["mt-7-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-8-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-8-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-8-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-8-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-8-color",
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
            settings["mt-8-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-8-lightness",
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
            settings["mt-8-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-9-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-9-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-9-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-9-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-9-color",
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
            settings["mt-9-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-9-lightness",
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
            settings["mt-9-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-10-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-10-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-10-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-10-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-10-color",
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
            settings["mt-10-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-10-lightness",
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
            settings["mt-10-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-11-word",
        name: "Magic Word",
        description: "Select magic word (omit the #)",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-11-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-11-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-11-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-11-color",
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
            settings["mt-11-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-11-lightness",
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
            settings["mt-11-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-12-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-12-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-12-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-12-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-12-color",
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
            settings["mt-12-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-12-lightness",
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
            settings["mt-12-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-13-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-13-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-13-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-13-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-13-color",
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
            settings["mt-13-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-13-lightness",
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
            settings["mt-13-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-14-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-14-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-14-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-14-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-14-color",
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
            settings["mt-14-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-14-lightness",
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
            settings["mt-14-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-15-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-15-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-15-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-15-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-15-color",
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
            settings["mt-15-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-15-lightness",
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
            settings["mt-15-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-16-word",
        name: "Magic Word",
        description: "Select magic word (omit the #)",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-16-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-16-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-16-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-16-color",
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
            settings["mt-16-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-16-lightness",
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
            settings["mt-16-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-17-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-17-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-17-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-17-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-17-color",
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
            settings["mt-17-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-17-lightness",
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
            settings["mt-17-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-18-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-18-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-18-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-18-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-18-color",
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
            settings["mt-18-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-18-lightness",
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
            settings["mt-18-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-19-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-19-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-19-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-19-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-19-color",
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
            settings["mt-19-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-19-lightness",
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
            settings["mt-19-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-20-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-20-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-20-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-20-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-20-color",
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
            settings["mt-20-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-20-lightness",
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
            settings["mt-20-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-21-word",
        name: "Magic Word",
        description: "Select magic word (omit the #)",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-21-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-21-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-21-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-21-color",
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
            settings["mt-21-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-21-lightness",
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
            settings["mt-21-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-22-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-22-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-22-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-22-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-22-color",
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
            settings["mt-22-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-22-lightness",
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
            settings["mt-22-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-23-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-23-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-23-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-23-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-23-color",
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
            settings["mt-23-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-23-lightness",
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
            settings["mt-23-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-24-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-24-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-24-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-24-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-24-color",
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
            settings["mt-24-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-24-lightness",
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
            settings["mt-24-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-25-word",
        name: "Magic Word",
        description: "Select magic word",
        action: {
          type: "input",
          placeholder: "word",
          onChange: (evt) => {
            settings["mt-25-word"] = evt.target.value;
            learnSpells();
          },
        },
      },
      {
        id: "mt-25-icon",
        name: "Icon",
        description: "Select icon",
        action: {
          type: "select",
          items: items,
          onChange: (evt) => {
            settings["mt-25-icon"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-25-color",
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
            settings["mt-25-color"] = evt.toString();
            learnSpells();
          },
        },
      },
      {
        id: "mt-25-lightness",
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
            settings["mt-25-lightness"] = evt.toString();
            learnSpells();
          },
        },
      },
    ],
  })
}

function addColorScheme() {
  if (document.getElementById("magic-tags-colors")) {
    document.getElementById("magic-tags-colors").remove();
  }
  
  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  var i: number;
  style.id = "magic-tags-colors";
  style.textContent = color_scheme;
  
  head.appendChild(style);
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
  onunload: onunload
}
import React, { useState } from "react";
import { Button, InputGroup, Popover } from "@blueprintjs/core";
import { ICONS_LIST, getIconHex, IconTheme, FEATHER_ICONS_LIST } from "./logic";

interface IconPickerProps {
  currentIcon: string;
  theme?: IconTheme;
  onChange: (iconName: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ currentIcon, theme = "blueprint", onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const iconList = theme === "feather" ? FEATHER_ICONS_LIST : ICONS_LIST;
  const fontSubstitute = theme === "feather" ? '"feather"' : '"Icons16", "Icons20", "blueprint-icons-16"';

  const filteredIcons = iconList.filter(({ name }) =>
    name.includes(search.toLowerCase())
  );

  const currentIconHex = getIconHex(currentIcon, theme);

  const content = (
    <div style={{ padding: "10px", width: "250px", maxHeight: "350px", display: "flex", flexDirection: "column" }}>
      <InputGroup
        leftIcon="search"
        placeholder="Search icons..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        style={{ marginBottom: "10px" }}
        autoFocus
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "5px",
          overflowY: "auto",
          flex: 1,
          padding: "2px",
          maxHeight: "250px",
        }}
      >
        {filteredIcons.map(({ name, hex }) => {
          const isSelected = name === currentIcon || hex.toLowerCase() === currentIcon.toLowerCase();
          return (
            <Button
              key={name}
              title={name}
              minimal
              active={isSelected}
              onClick={() => {
                onChange(name);
                setIsOpen(false);
              }}
              style={{ padding: 0, minHeight: 35, minWidth: 35 }}
            >
              <span
                style={{
                  fontFamily: fontSubstitute,
                  fontSize: "20px",
                }}
              >
                {String.fromCharCode(parseInt(hex, 16))}
              </span>
            </Button>
          );
        })}
      </div>
      <Button
        minimal
        fill
        onClick={() => setIsOpen(false)}
        style={{ marginTop: "10px" }}
      >
        Close
      </Button>
    </div>
  );

  return (
    <Popover
      isOpen={isOpen}
      onInteraction={(nextOpenState) => setIsOpen(nextOpenState)}
      content={content}
      position="bottom"
    >
      <Button
        fill
        style={{ width: "40px", padding: 0 }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span
            style={{
              fontFamily: fontSubstitute,
              fontSize: "16px",
            }}
          >
            {String.fromCharCode(parseInt(currentIconHex, 16))}
          </span>
        </div>
      </Button>
    </Popover>
  );
};

export default IconPicker;

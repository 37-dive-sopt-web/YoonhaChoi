import { createTheme } from "@vanilla-extract/css";

import { color } from "./token/color.css";

const tokens = {
  color: color,
};

const [themeClass, themeVars] = createTheme(tokens);

export { themeClass, themeVars, tokens };

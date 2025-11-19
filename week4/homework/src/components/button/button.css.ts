import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../styles/theme.css";

export const button = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.5rem",
    width: "100%",
    borderRadius: "8px",
    color: themeVars.color.white,
    fontWeight: "700",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
  },

  variants: {
    disabled: {
      true: {
        backgroundColor: themeVars.color.teal_03,
        cursor: "not-allowed",
      },
      false: {
        backgroundColor: themeVars.color.teal_01,
        selectors: {
          "&:not(:disabled):hover": {
            backgroundColor: themeVars.color.teal_02,
          },
        },
      },
    },
  },
});

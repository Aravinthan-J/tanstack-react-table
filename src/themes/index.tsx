import { useEffect, useRef, useState } from "react";

import { DEFAULT_THEME_VARIABLES } from "./constant.ts";

export interface LargeThemeConfig {
  // New: Old prefix to new prefix mapping
  prefix?: {
    oldPrefix?: string;
    newPrefix?: string;
  };
  // New: Variables to override
  variables?: Record<string, string>;
  css?: string;
  // Pre-built CSS string for performance
  cssString?: string;
}

export function useTableTheme(
  theme?: LargeThemeConfig,
  tableId: string = ":root"
) {
  const styleElementRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!theme) return;

    // Remove existing style element
    if (styleElementRef.current && styleElementRef.current.parentNode) {
      styleElementRef.current.parentNode.removeChild(styleElementRef.current);
    }

    // ✅ Create single style element with all variables
    const styleElement = document.createElement("style");
    styleElement.id = `dynamic-user-theme`;

    let cssContent = "";
    const scopeSelector = tableId === ":root" ? ":root" : `#${tableId}`;

    // Batch all CSS variables into one CSS rule
    if (theme.variables && Object.keys(theme.variables).length > 0) {
      const variablesCSS = Object.entries(theme.variables)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");

      cssContent += `${scopeSelector} { ${variablesCSS}; }\n`;
    }

    // Add prefix replacement
    if (theme.prefix) {
      const prefixCSS = Object.keys(DEFAULT_THEME_VARIABLES)
        .map((themeVar) => {
          const newVar = themeVar.replace(
            theme.prefix!.oldPrefix!,
            theme.prefix!.newPrefix!
          );
          return `${themeVar}: var(${newVar})`;
        })
        .join("; ");

      cssContent += `${scopeSelector} { ${prefixCSS}; }\n`;
    }

    // Add custom CSS
    if (theme.css) {
      const scopedCSS = theme.css.replace(
        /([^{}]+)\s*{/g,
        (match, selector) => {
          return `${scopeSelector} ${selector.trim()} {`;
        }
      );
      cssContent += scopedCSS;
    }

    // ✅ Single DOM operation instead of 10,000
    styleElement.innerHTML = cssContent;
    document.head.appendChild(styleElement);
    styleElementRef.current = styleElement;

    return () => {
      if (styleElementRef.current && styleElementRef.current.parentNode) {
        styleElementRef.current.parentNode.removeChild(styleElementRef.current);
        styleElementRef.current = null;
      }
    };
  }, [theme, tableId]);

  return tableId;
}

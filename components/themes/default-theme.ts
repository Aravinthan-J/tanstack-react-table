import type { TableTheme } from "../table/Table.types";

export const defaultTheme: TableTheme = {
  colors: {
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    primary: "221.2 83.2% 53.3%",
    secondary: "210 40% 96.1%",
    muted: "210 40% 96.1%",
    accent: "210 40% 96.1%",
    border: "214.3 31.8% 91.4%",
    error: "0 84.2% 60.2%",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
  },
};

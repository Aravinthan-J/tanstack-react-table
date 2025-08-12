import React from "react";
import type { CellProps } from "../Table.types";

/**
 * Read-only cell for displaying non-editable content
 */
export function ReadOnlyCell({ value, ariaLabel }: CellProps) {
  const displayValue = value == null ? "" : String(value);

  return (
    <div
      style={{
        width: "100%",
        padding: "4px 8px",
        minHeight: "20px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: "hsl(var(--foreground))",
      }}
      aria-label={ariaLabel}
      title={displayValue}
    >
      {displayValue || (
        <span
          style={{
            color: "hsl(var(--muted-foreground))",
            fontStyle: "italic",
          }}
        >
          Empty
        </span>
      )}
    </div>
  );
}

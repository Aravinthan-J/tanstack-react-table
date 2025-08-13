import React from "react";
import type { CellProps } from "../Table.types";

/**
 * Read-only cell for displaying non-editable content
 */
export function ReadOnlyCell({ value, ariaLabel }: CellProps) {
  const displayValue = value == null ? "" : String(value);

  return (
    <div
      className="w-full px-2 py-1 min-h-8 flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-foreground bg-transparent"
      aria-label={ariaLabel || `Read-only value: ${displayValue}`}
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

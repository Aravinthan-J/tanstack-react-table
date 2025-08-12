import React, { useCallback } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import type { CellProps } from "../Table.types";

/**
 * Editable boolean cell using Radix UI Toggle
 */
export function EditableBooleanCell({
  value = false,
  onCommit,
  onChange,
  readOnly = false,
  isError = false,
  ariaLabel,
}: CellProps) {
  const booleanValue = Boolean(value);

  const handleToggle = useCallback(
    (pressed: boolean) => {
      if (!readOnly) {
        onChange(pressed);
        onCommit(pressed);
      }
    },
    [readOnly, onChange, onCommit]
  );

  if (readOnly) {
    return (
      <div
        style={{
          width: "100%",
          padding: "4px 8px",
          minHeight: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label={ariaLabel}
      >
        <span
          style={{
            fontSize: "16px",
            color: booleanValue
              ? "hsl(var(--primary))"
              : "hsl(var(--muted-foreground))",
          }}
        >
          {booleanValue ? "✓" : "✗"}
        </span>
      </div>
    );
  }

  return (
    <Toggle.Root
      pressed={booleanValue}
      onPressedChange={handleToggle}
      aria-label={ariaLabel || `Toggle ${booleanValue ? "off" : "on"}`}
      style={{
        width: "100%",
        padding: "4px 8px",
        border: `1px solid ${
          isError ? "hsl(var(--destructive))" : "transparent"
        }`,
        borderRadius: "4px",
        backgroundColor: "transparent",
        cursor: "pointer",
        minHeight: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
      }}
      className="hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 data-[state=on]:bg-primary/10 data-[state=on]:text-primary group-hover/table_cell:border-gray-200"
    >
      <div
        style={{
          width: "32px",
          height: "18px",
          backgroundColor: booleanValue
            ? "hsl(var(--primary))"
            : "hsl(var(--muted))",
          borderRadius: "9px",
          position: "relative",
          transition: "background-color 0.2s",
          border: "1px solid hsl(var(--border))",
        }}
      >
        <div
          style={{
            width: "14px",
            height: "14px",
            backgroundColor: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "1px",
            left: booleanValue ? "16px" : "1px",
            transition: "left 0.2s",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </Toggle.Root>
  );
}

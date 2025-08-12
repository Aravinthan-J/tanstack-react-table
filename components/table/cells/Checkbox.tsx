import * as RadixCheckbox from "@radix-ui/react-checkbox";
import React from "react";

interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (event: any) => void;
}

export function CheckBox({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
}: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      className="checkbox-root"
      checked={indeterminate ? "indeterminate" : checked}
      disabled={disabled}
      onCheckedChange={onChange}
      style={{
        width: "18px",
        height: "18px",
        borderRadius: "4px",
        border: "2px solid hsl(var(--border))",
        backgroundColor: checked ? "hsl(var(--primary))" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <RadixCheckbox.Indicator>
        {indeterminate ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
            <rect x="2" y="5" width="8" height="2" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}

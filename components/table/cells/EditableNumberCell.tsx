import * as Popover from "@radix-ui/react-popover";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CellProps } from "../Table.types";

/**
 * Editable number cell with validation
 */
export function EditableNumberCell({
  value = 0,
  onCommit,
  onCancel,
  onChange,
  validate,
  readOnly = false,
  autoFocus = false,
  ariaLabel,
}: CellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value));
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(String(value));
  }, [value]);

  const handleEdit = useCallback(() => {
    if (!readOnly) {
      setIsEditing(true);
      setEditValue(String(value));
      setError(null);
    }
  }, [readOnly, value]);

  const handleCommit = useCallback(() => {
    const numValue = Number.parseFloat(editValue);

    if (isNaN(numValue)) {
      setError("Please enter a valid number");
      return;
    }

    if (validate) {
      const validation = validate(numValue);
      if (typeof validation === "string") {
        setError(validation);
        return;
      } else if (validation === false) {
        setError("Invalid value");
        return;
      }
    }

    if (numValue !== value) {
      onCommit(numValue);
    }
    setIsEditing(false);
    setError(null);
  }, [editValue, value, validate, onCommit]);

  const handleCancel = useCallback(() => {
    setEditValue(String(value));
    setIsEditing(false);
    setError(null);
    onCancel();
  }, [value, onCancel]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          handleCommit();
          break;
        case "Escape":
          e.preventDefault();
          handleCancel();
          break;
      }
    },
    [handleCommit, handleCancel]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setEditValue(newValue);
      onChange(newValue);
      setError(null);
    },
    [onChange]
  );

  const formatDisplay = (val: any) => {
    const num = Number.parseFloat(val);
    if (isNaN(num)) return "0";
    return num.toLocaleString();
  };

  return (
    <Popover.Root open={isEditing} onOpenChange={setIsEditing}>
      <Popover.Trigger asChild>
        <div
          className="cell-display number-cell"
          style={{
            width: "100%",
            padding: "4px 8px",
            cursor: readOnly ? "default" : "pointer",
            borderRadius: "4px",
            minHeight: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          onClick={handleEdit}
          onDoubleClick={handleEdit}
          role="button"
          tabIndex={readOnly ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleEdit();
            }
          }}
          aria-label={ariaLabel || `Edit number ${value}`}
          className="hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {formatDisplay(value)}
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="popover-content"
          style={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            padding: "8px",
            zIndex: 50,
          }}
          onOpenAutoFocus={(e) => {
            if (autoFocus && inputRef.current) {
              e.preventDefault();
              inputRef.current.focus();
              inputRef.current.select();
            }
          }}
        >
          <input
            ref={inputRef}
            type="number"
            value={editValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleCommit}
            className="number-input"
            style={{
              width: "150px",
              padding: "6px 8px",
              border: error
                ? "1px solid hsl(var(--destructive))"
                : "1px solid hsl(var(--border))",
              borderRadius: "4px",
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              fontSize: "14px",
              outline: "none",
              textAlign: "right",
            }}
            aria-label={ariaLabel}
            aria-invalid={!!error}
          />
          {error && (
            <div
              className="error-message"
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "hsl(var(--destructive))",
              }}
            >
              {error}
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

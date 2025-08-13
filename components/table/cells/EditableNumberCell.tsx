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
  readOnly = false,
  isError = false,
  errors = [],
  autoFocus = false,
  ariaLabel,
}: CellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value ?? ""));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(String(value ?? ""));
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current && autoFocus) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing, autoFocus]);

  const handleEdit = useCallback(() => {
    if (!readOnly) {
      setIsEditing(true);
      setEditValue(String(value));
    }
  }, [readOnly]);

  const handleCommit = useCallback(() => {
    const numValue = editValue.trim() === "" ? null : Number(editValue);
    if (numValue !== value) {
      onCommit(numValue);
    }
    setIsEditing(false);
  }, [editValue, value, onCommit]);

  const handleCancel = useCallback(() => {
    setEditValue(String(value ?? ""));
    setIsEditing(false);
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
    [handleCommit, handleCancel],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setEditValue(newValue);
      const numValue = newValue.trim() === "" ? null : Number(newValue);
      onChange(numValue);
    },
    [onChange],
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
          className={`cell-display number-cell w-full px-2 py-1 min-h-8 flex items-center justify-end rounded cursor-pointer
        hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20
        ${readOnly ? "cursor-default hover:bg-transparent" : ""}`}
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
            className={`
           number-input w-full px-2 py-1 text-sm bg-background border rounded text-right
            focus:outline-none focus:ring-2 focus:ring-primary/20
            ${isError ? "border-destructive" : "border-border"}
            ${readOnly ? "cursor-not-allowed opacity-50" : ""}
          `}
            disabled={readOnly}
            aria-label={ariaLabel}
            aria-invalid={!!errors.length}
          />
          {errors.length > 0 && (
            <div className="absolute top-full left-0 z-10 mt-1 p-1 text-xs text-destructive bg-background border border-destructive rounded shadow-sm">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

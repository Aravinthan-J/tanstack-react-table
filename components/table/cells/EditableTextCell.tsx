import React, { useState, useRef, useCallback, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import type { CellProps } from "../Table.types";

/**
 * Editable text cell using Radix UI Popover for inline editing
 * Provides accessible keyboard navigation and focus management
 */
export function EditableTextCell({
  value = "",
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
  const [editValue, setEditValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(String(value));
  }, [value]);

  const handleEdit = useCallback(() => {
    if (!readOnly) {
      setIsEditing(true);
      setEditValue(String(value));
    }
  }, [readOnly, value]);

  const handleCommit = useCallback(() => {
    const trimmedValue = editValue.trim();
    if (trimmedValue !== String(value)) {
      onCommit(trimmedValue);
    }
    setIsEditing(false);
  }, [editValue, value, onCommit]);

  const handleCancel = useCallback(() => {
    setEditValue(String(value));
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
    [handleCommit, handleCancel]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setEditValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <Popover.Root open={isEditing} onOpenChange={setIsEditing}>
      <Popover.Trigger asChild>
        <div
          className={`cell-display ${readOnly ? "readonly" : "editable"}`}
          style={{
            width: "100%",
            padding: "4px 8px",
            cursor: readOnly ? "default" : "pointer",
            borderRadius: "4px",
            minHeight: "32px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            border: isError ? "1px solid hsl(var(--destructive))" : "none",
            backgroundColor: isError
              ? "hsl(var(--destructive) / 0.1)"
              : "transparent",
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
          aria-label={ariaLabel || `Edit ${value}`}
          className="hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {value || (
            <span style={{ color: "hsl(var(--muted-foreground))" }}>
              Click to edit
            </span>
          )}
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
            type="text"
            value={editValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleCommit}
            className="text-input"
            style={{
              width: "200px",
              padding: "6px 8px",
              border: "1px solid hsl(var(--border))",
              borderRadius: "4px",
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              fontSize: "14px",
              outline: "none",
            }}
            aria-label={ariaLabel}
          />
          {errors.length > 0 && (
            <div
              className="error-messages"
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "hsl(var(--destructive))",
              }}
            >
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

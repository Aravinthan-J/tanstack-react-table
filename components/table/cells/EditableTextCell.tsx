import * as Popover from "@radix-ui/react-popover";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
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
    [handleCommit, handleCancel],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setEditValue(newValue);
      onChange(newValue);
    },
    [onChange],
  );

    return (
    <Popover.Root open={isEditing} onOpenChange={setIsEditing}>
      <Popover.Trigger asChild>
        <div
         className={`
          cell-display w-full px-2 py-1 min-h-8 flex items-center rounded cursor-pointer
          hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20
          ${readOnly ? "cursor-default hover:bg-transparent" : ""} ${isError ? "border border-destructive bg-destructive/10":""}
        `}
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
        >
          {value || (
            <span className="text-muted-foreground">Click to edit</span>
          )}
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-background border rounded-lg shadow-lg p-2 z-50"
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
            className="w-[200px] px-2 py-1.5 border rounded-md bg-background text-foreground text-sm outline-none"
          aria-label={ariaLabel}
        />
        {errors.length > 0 && (
            <div className="mt-1 text-xs text-destructive">
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

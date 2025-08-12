import React, { useState, useRef, useCallback, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import type { CellProps } from "../Table.types";

export function EditableEmailCell({
  value = "",
  onCommit,
  onCancel,
  onChange,
  validate,
  readOnly = false,
  isError = false,
  errors = [],
  autoFocus = false,
  ariaLabel,
}: CellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value));
  const [localErrors, setLocalErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return ["Email is required"];
    if (!emailRegex.test(email)) return ["Invalid email format"];
    return [];
  }, []);

  const handleCommit = useCallback(() => {
    const trimmedValue = editValue.trim();
    const errors = validate
      ? validate(trimmedValue)
      : validateEmail(trimmedValue);

    if (typeof errors === "boolean" ? !errors : errors.length > 0) {
      setLocalErrors(typeof errors === "boolean" ? ["Invalid email"] : errors);
      return;
    }

    onCommit(trimmedValue);
    setIsEditing(false);
    setLocalErrors([]);
  }, [editValue, validate, validateEmail, onCommit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleCommit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
        setIsEditing(false);
        setEditValue(String(value));
        setLocalErrors([]);
      }
    },
    [handleCommit, onCancel, value]
  );

  return isEditing ? (
    <Popover.Root open={isEditing} onOpenChange={setIsEditing}>
      <Popover.Anchor asChild>
        <div style={{ width: "100%" }} />
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          className="radix-popover-content"
          style={{
            backgroundColor: "hsl(var(--background))",
            border: "2px solid hsl(var(--border))",
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            minWidth: "200px",
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
            inputRef.current?.select();
          }}
        >
          <input
            ref={inputRef}
            type="email"
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
              onChange(e.target.value);
              setLocalErrors([]);
            }}
            onKeyDown={handleKeyDown}
            className="email-input"
            style={{
              width: "100%",
              padding: "6px 8px",
              border: `1px solid ${
                localErrors.length > 0
                  ? "hsl(var(--destructive))"
                  : "hsl(var(--border))"
              }`,
              borderRadius: "4px",
              fontSize: "14px",
              outline: "none",
            }}
            autoFocus={autoFocus}
            aria-label={ariaLabel || "Edit email"}
            aria-invalid={localErrors.length > 0}
          />
          {localErrors.length > 0 && (
            <div
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "hsl(var(--destructive))",
              }}
            >
              {localErrors[0]}
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ) : (
    <div
      className="cell-display email-cell"
      onClick={() => !readOnly && setIsEditing(true)}
      style={{
        width: "100%",
        padding: "4px 8px",
        cursor: readOnly ? "default" : "pointer",
        borderRadius: "4px",
        minHeight: "24px",
        display: "flex",
        alignItems: "center",
        color: isError ? "hsl(var(--destructive))" : "inherit",
      }}
      tabIndex={readOnly ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !readOnly) {
          e.preventDefault();
          setIsEditing(true);
        }
      }}
    >
      {value || (
        <span style={{ color: "hsl(var(--muted-foreground))" }}>
          Enter email
        </span>
      )}
    </div>
  );
}

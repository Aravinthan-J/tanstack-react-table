import React, { useState, useRef, useCallback, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { CellProps } from "../Table.types";

/**
 * Editable textarea cell using Dialog for multi-line editing
 */
export function EditableTextAreaCell({
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setEditValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  const truncatedValue =
    String(value).length > 50
      ? String(value).substring(0, 47) + "..."
      : String(value);

  return (
    <>
      <div
        className="cell-display"
        style={{
          width: "100%",
          padding: "4px 8px",
          cursor: readOnly ? "default" : "pointer",
          borderRadius: "4px",
          transition: "background-color 0.2s",
          minHeight: "20px",
          display: "flex",
          alignItems: "center",
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
        aria-label={ariaLabel || `Edit text ${truncatedValue}`}
        className="hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {value ? (
          <span title={String(value)}>{truncatedValue}</span>
        ) : (
          <span style={{ color: "hsl(var(--muted-foreground))" }}>
            Click to add text
          </span>
        )}
      </div>

      <Dialog.Root open={isEditing} onOpenChange={setIsEditing}>
        <Dialog.Portal>
          <Dialog.Overlay
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              inset: 0,
              zIndex: 1000,
            }}
          />
          <Dialog.Content
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              padding: "24px",
              width: "90vw",
              maxWidth: "500px",
              maxHeight: "80vh",
              zIndex: 1001,
              boxShadow: "0 10px 38px -10px rgba(0, 0, 0, 0.35)",
            }}
            onOpenAutoFocus={() => textareaRef.current?.focus()}
          >
            <Dialog.Title
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "hsl(var(--foreground))",
              }}
            >
              Edit Text
            </Dialog.Title>

            <div>
              <textarea
                ref={textareaRef}
                value={editValue}
                onChange={handleInputChange}
                autoFocus={autoFocus}
                aria-label={ariaLabel}
                aria-invalid={isError}
                placeholder="Enter text..."
                rows={6}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: `1px solid ${
                    isError ? "hsl(var(--destructive))" : "hsl(var(--border))"
                  }`,
                  borderRadius: "4px",
                  fontSize: "14px",
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                  resize: "vertical",
                  minHeight: "120px",
                }}
                className="focus:outline-none focus:ring-2 focus:ring-primary/20"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    handleCancel();
                  }
                  // Allow Ctrl+Enter to save
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleCommit();
                  }
                }}
              />

              {errors.length > 0 && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "hsl(var(--destructive))",
                  }}
                >
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <Dialog.Close asChild>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "4px",
                      backgroundColor: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      cursor: "pointer",
                    }}
                    className="hover:bg-muted"
                  >
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  onClick={handleCommit}
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    border: "1px solid hsl(var(--primary))",
                    borderRadius: "4px",
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    cursor: "pointer",
                  }}
                  className="hover:opacity-90"
                >
                  Save
                </button>
              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "hsl(var(--muted-foreground))",
                  textAlign: "center",
                }}
              >
                Press Ctrl+Enter to save quickly
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

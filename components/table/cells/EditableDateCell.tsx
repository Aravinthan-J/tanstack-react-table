import React, { useState, useCallback, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import type { CellProps } from "../Table.types";

/**
 * Editable date cell using Radix UI Popover with date input
 */
export function EditableDateCell({
  value,
  onCommit,
  onCancel,
  onChange,
  readOnly = false,
  isError = false,
  errors = [],
  autoFocus = false,
  ariaLabel,
}: CellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editValue, setEditValue] = useState("");

  const formatDate = useCallback((date: Date | string | null): string => {
    if (!date) return "";
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return "";
    return dateObj.toISOString().split("T")[0]; // YYYY-MM-DD format
  }, []);

  const formatDisplayDate = useCallback(
    (date: Date | string | null): string => {
      if (!date) return "";
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return "";
      return dateObj.toLocaleDateString(); // Localized format
    },
    []
  );

  useEffect(() => {
    setEditValue(formatDate(value));
  }, [value, formatDate]);

  const handleEdit = useCallback(() => {
    if (!readOnly) {
      setIsOpen(true);
      setEditValue(formatDate(value));
    }
  }, [readOnly, value, formatDate]);

  const handleCommit = useCallback(() => {
    if (editValue) {
      const newDate = new Date(editValue);
      if (!isNaN(newDate.getTime())) {
        onCommit(newDate);
      }
    } else {
      onCommit(null);
    }
    setIsOpen(false);
  }, [editValue, onCommit]);

  const handleCancel = useCallback(() => {
    setEditValue(formatDate(value));
    setIsOpen(false);
    onCancel();
  }, [value, formatDate, onCancel]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setEditValue(newValue);
      if (newValue) {
        const date = new Date(newValue);
        if (!isNaN(date.getTime())) {
          onChange(date);
        }
      } else {
        onChange(null);
      }
    },
    [onChange]
  );

  const displayValue = formatDisplayDate(value);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <div
          style={{
            width: "100%",
            padding: "4px 8px",
            cursor: readOnly ? "default" : "pointer",
            borderRadius: "4px",
            transition: "background-color 0.2s",
            minHeight: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            border: `1px solid ${
              isError ? "hsl(var(--destructive))" : "transparent"
            }`,
          }}
          onClick={handleEdit}
          role="button"
          tabIndex={readOnly ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleEdit();
            }
          }}
          aria-label={ariaLabel || `Edit date ${displayValue}`}
          className="hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 group-hover/table_cell:border-gray-200"
        >
          <span>
            {displayValue || (
              <span style={{ color: "hsl(var(--muted-foreground))" }}>
                Select date
              </span>
            )}
          </span>
          <span style={{ marginLeft: "4px", fontSize: "12px", opacity: 0.7 }}>
            📅
          </span>
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          style={{
            backgroundColor: "hsl(var(--background))",
            border: `2px solid ${
              isError ? "hsl(var(--destructive))" : "hsl(var(--primary))"
            }`,
            borderRadius: "6px",
            padding: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: "200px",
            zIndex: 1000,
          }}
          sideOffset={4}
          align="start"
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "500",
                marginBottom: "4px",
                color: "hsl(var(--foreground))",
              }}
            >
              Select Date
            </label>

            <input
              type="date"
              value={editValue}
              onChange={handleInputChange}
              autoFocus={autoFocus}
              aria-label={ariaLabel}
              aria-invalid={isError}
              style={{
                width: "100%",
                padding: "6px 8px",
                border: `1px solid ${
                  isError ? "hsl(var(--destructive))" : "hsl(var(--border))"
                }`,
                borderRadius: "4px",
                fontSize: "14px",
                backgroundColor: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
              className="focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            {errors.length > 0 && (
              <div
                style={{
                  marginTop: "6px",
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
                marginTop: "12px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "6px",
              }}
            >
              <button
                onClick={handleCancel}
                style={{
                  padding: "4px 12px",
                  fontSize: "12px",
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
              <button
                onClick={handleCommit}
                style={{
                  padding: "4px 12px",
                  fontSize: "12px",
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
              <button
                onClick={() => {
                  setEditValue("");
                  onCommit(null);
                  setIsOpen(false);
                }}
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "4px",
                  backgroundColor: "hsl(var(--background))",
                  color: "hsl(var(--muted-foreground))",
                  cursor: "pointer",
                }}
                className="hover:bg-muted"
              >
                Clear
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

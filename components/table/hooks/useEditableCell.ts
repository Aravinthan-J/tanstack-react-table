import type { Column, Row } from "@tanstack/react-table";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseEditableCellProps<T = any> {
  row: Row<T>;
  column: Column<T>;
  initialValue: any;
  onCommit?: (value: any) => void;
  onCancel?: () => void;
  validate?: (value: any) => boolean | string[];
}

export function useEditableCell<T = any>({
  row,
  column,
  initialValue,
  onCommit,
  onCancel,
  validate,
}: UseEditableCellProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const previousValue = useRef(initialValue);

  // Update value when external value changes
  useEffect(() => {
    if (!isEditing) {
      setValue(initialValue);
      previousValue.current = initialValue;
    }
  }, [initialValue, isEditing]);

  const validateValue = useCallback(
    (val: any): boolean => {
      if (!validate) return true;

      const result = validate(val);
      if (typeof result === "boolean") {
        setErrors(result ? [] : ["Invalid value"]);
        return result;
      } else {
        setErrors(result);
        return result.length === 0;
      }
    },
    [validate],
  );

  const startEditing = useCallback(() => {
    setIsEditing(true);
    setValue(initialValue);
    setErrors([]);
    setHasUnsavedChanges(false);
  }, [initialValue]);

  const commitEdit = useCallback(() => {
    if (!validateValue(value)) {
      return false;
    }

    if (value !== previousValue.current) {
      onCommit?.(value);
      previousValue.current = value;
    }

    setIsEditing(false);
    setHasUnsavedChanges(false);
    setErrors([]);
    return true;
  }, [value, onCommit, validateValue]);

  const cancelEdit = useCallback(() => {
    setValue(previousValue.current);
    setIsEditing(false);
    setHasUnsavedChanges(false);
    setErrors([]);
    onCancel?.();
  }, [onCancel]);

  const updateValue = useCallback(
    (newValue: any) => {
      setValue(newValue);
      setHasUnsavedChanges(newValue !== previousValue.current);

      // Clear errors when value changes
      if (errors.length > 0) {
        setErrors([]);
      }
    },
    [errors.length],
  );

  const isReadOnly = column.columnDef.meta?.isReadOnly || false;
  const cellType = column.columnDef.meta?.type || "text";

  return {
    // State
    isEditing,
    value,
    errors,
    hasUnsavedChanges,
    isReadOnly,
    cellType,

    // Actions
    startEditing,
    commitEdit,
    cancelEdit,
    updateValue,
    validateValue,

    // Computed
    isValid: errors.length === 0,
    canEdit: !isReadOnly && !row.getIsGrouped(),

    // Metadata
    rowId: row.id,
    columnId: column.id,
    originalValue: previousValue.current,
  };
}

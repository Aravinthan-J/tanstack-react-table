/**
 * Event constants for table operations
 */

export const EXPANDABLE_TYPES = {
  NONE: "none",
  ROW: "row",
  ACCORDION: "accordion",
} as const;

export const UPDATED_EVENTS = {
  ROW_SELECTED: "row-selected",
  ALL_ROW_SELECTED: "all-row-selected",
  ROW_EXPAND: "row-expand",
  ALL_ROW_EXPAND: "all-row-expand",
  COLUMN_HIDE: "column-hide",
  COLUMN_SHOW: "column-show",
  COLUMN_RESIZE: "column-resize",
  COLUMN_DRAG: "column-drag",
  ROW_DRAG: "row-drag",
  COLUMN_PIN: "column-pin",
  COLUMN_UNPIN: "column-unpin",
  CELL_EDIT: "cell-edit",
  ROW_ADD: "row-add",
  ROW_REMOVE: "row-remove",
} as const;

export const CELL_TYPES = {
  TEXT: "text",
  NUMBER: "number",
  EMAIL: "email",
  TEXTAREA: "textarea",
  SELECT: "select",
  DATE: "date",
  BOOLEAN: "boolean",
  RATING: "rating",
  READONLY: "readonly",
} as const;

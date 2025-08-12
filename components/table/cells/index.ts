import { EditableTextCell } from "./EditableTextCell";
import { EditableNumberCell } from "./EditableNumberCell";
import { EditableEmailCell } from "./EditableEmailCell";
import { EditableTextAreaCell } from "./EditableTextAreaCell";
import { EditableSelectCell } from "./EditableSelectCell";
import { EditableDateCell } from "./EditableDateCell";
import { EditableBooleanCell } from "./EditableBooleanCell";
import { EditableRatingCell } from "./EditableRatingCell";
import { ReadOnlyCell } from "./ReadOnlyCell";

import { CELL_TYPES } from "../utils/events";
import type { CellProps } from "../Table.types";

// Cell registry for mapping cell types to components
export const cellRegistry: Record<string, React.ComponentType<CellProps>> = {
  [CELL_TYPES.TEXT]: EditableTextCell,
  [CELL_TYPES.NUMBER]: EditableNumberCell,
  [CELL_TYPES.EMAIL]: EditableEmailCell,
  [CELL_TYPES.TEXTAREA]: EditableTextAreaCell,
  [CELL_TYPES.SELECT]: EditableSelectCell,
  [CELL_TYPES.DATE]: EditableDateCell,
  [CELL_TYPES.BOOLEAN]: EditableBooleanCell,
  [CELL_TYPES.RATING]: EditableRatingCell,
  [CELL_TYPES.READONLY]: ReadOnlyCell,
};

// Export all cell components
export {
  EditableTextCell,
  EditableNumberCell,
  EditableEmailCell,
  EditableTextAreaCell,
  EditableSelectCell,
  EditableDateCell,
  EditableBooleanCell,
  EditableRatingCell,
  ReadOnlyCell,
};

// Export types
export type { CellProps } from "../Table.types";

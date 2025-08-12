import { EditableBooleanCell } from "./EditableBooleanCell";
import { EditableDateCell } from "./EditableDateCell";
import { EditableEmailCell } from "./EditableEmailCell";
import { EditableNumberCell } from "./EditableNumberCell";
import { EditableRatingCell } from "./EditableRatingCell";
import { EditableSelectCell } from "./EditableSelectCell";
import { EditableTextAreaCell } from "./EditableTextAreaCell";
import { EditableTextCell } from "./EditableTextCell";
import { ReadOnlyCell } from "./ReadOnlyCell";

import type { CellProps } from "../Table.types";
import { CELL_TYPES } from "../utils/events";

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

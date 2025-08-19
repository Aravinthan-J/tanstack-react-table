import type { ColumnDef } from "@tanstack/react-table";
import { CellWidgets } from "./constant.ts";

interface CellWrapperProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  onDone: () => void;
  column: ColumnDef<object>;
  isError: boolean;
  readOnly: boolean;
  errors: Array<string>;
}

export function CellWrapper(props: CellWrapperProps) {
  const { type } = props;
  const Widget = CellWidgets[
    type as keyof typeof CellWidgets
  ] as React.ComponentType<{
    value: string;
    onChange: (value: string) => void;
    onDone: () => void;
    isError: boolean;
    readOnly: boolean;
    errors: Array<string>;
  }>;

  return <Widget {...props} />;
}

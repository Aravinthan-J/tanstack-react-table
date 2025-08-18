import type React from "react";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import {
  type ColumnOrderState,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  type RowData,
  useReactTable,
  type ColumnDef,
  type Row,
  type ExpandedState
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { arrayMove } from "@dnd-kit/sortable";

import { SerialNumberColumn } from "./serial_number.tsx";
import { defaultColumn } from "./utils.tsx";
import { TableHeader } from "./header.tsx";
import { TableBody } from "./body.tsx";
import { TableProvider } from "./tablecontext.tsx";
import { DEFAULT_KEYS, EXPANDABLE_TYPES, UPDATED_EVENTS } from "./constant.ts";


declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue> {
    type: string;
    validate: (args: unknown) => string[];
  }
}

interface ColumnProps {
  // Unique identifier for the column
  Id: string;

  // Display title of the column
  Title: string | JSX.Element;

  // Optional data type of the column
  Type?: string;

  // Optional custom render function for the column cell
  Render?: ({
    row,
    onExpand,
    onDone
  }: {
    row: Row<object>;
    onExpand: () => void;
    onDone: ({
      rowId,
      changedValue
    }: { rowId: string; changedValue: object }) => void;
  }) => JSX.Element;

  // Optional fixed position for the column (e.g., 'left' or 'right')
  Fixed?: string | null;

  // Enable sorting functionality for the column
  enableSorting?: boolean;

  // Enable resizing functionality for the column
  enableResizing?: boolean;

  // Enable hiding functionality for the column
  enableHiding?: boolean;

  // Enable pinning functionality for the column
  enablePinning?: boolean;

  // Enable ordering functionality for the column
  enableOrdering?: boolean;

  // Initial width of the column
  Width?: number;

  // Minimum width the column can be resized to
  MinWidth?: number;

  // Maximum width the column can be resized to
  MaxWidth?: number;

  // Optional custom footer renderer for the column
  Footer?: () => JSX.Element;

  // Optional custom header renderer for the column
  Header?: () => JSX.Element;
}

export interface ExpandableProps {
  // Type of expansion (e.g., 'accordion', 'row')
  type: string;

  // Determines if the row is expandable
  isExpandable: boolean;

  // Optional: Expands the entire row upon click
  expandEntireRowByClick?: boolean;

  // Optional: Keys of the rows that are expanded by default
  expandedRowKeys?: Array<string>;

  // Optional custom renderer for expanded rows
  expandedRowRender?: ((row: Row<object>) => React.ReactNode) | null;
}

interface TableOptionProps {
  /**
   * Enables sorting functionality for the all columns
   */
  enableSorting?: boolean;

  /**
   * Enables resizing functionality for the all columns
   */
  enableResizing?: boolean;

  /**
   * Enables hiding functionality for the all columns
   */
  enableHiding?: boolean;

  /**
   * Enables pinning functionality for the all columns
   */
  enablePinning?: boolean;

  /**
   * Enables ordering functionality for the all columns
   */
  enableOrdering?: boolean;

  /**
   * Enables row ordering functionality for the table
   */
  enableRowOrdering?: boolean;
}

// Table properties interface
export interface TableProps {
  /**
   * Selected items in the table
   */
  selectedItems: Array<string>;

  /**
   * Show or hide the serial number column
   */
  showSerialNumber: boolean;

  /**
   * Show or hide the row selection column
   */
  showRowSelection: boolean;

  /**
   * Array of column properties
   */
  columns: Array<ColumnProps>;

  /**
   * Array of data objects
   */
  datasource: Array<object>;

  /**
   * Empty state component
   */
  emptyState: ReactNode;

  /**
   * Callback function when the user makes a change to the table
   */
  onEventUpdate: ({
    type,
    value
  }: { type: string; value: string | object | string[] }) => void;

  /**
   * Key of the column to be used as the row key
   */
  rowKey: string;

  /**
   * Expandable props
   */
  expandable: ExpandableProps;

  /**
   * Callback function to fetch the next page of data when the user reaches the end of the table
   */
  onEndReached: () => void;

  /**
   * Flag to indicate if the table is loading
   */
  loading?: boolean;

  /**
   * Flag to indicate if the table is vitrual
   */
  isVirtual: boolean;

  /**
   * Height of the table
   */
  tableHeight: number;

  /**
   * Height of each row
   */
  rowHeight: number;

  /**
   * Table options
   */
  options: TableOptionProps;
}

export interface DataTableRef {
  /**
   * Updates the data of the table
   */
  onRowUpdate: ({
    rowId,
    changedValue
  }: { rowId: string; changedValue: object }) => void;

  /**
   * Updates the table data
   */
  updateTableData: ({
    type,
    value
  }: { type: string; value: string | object | string[] }) => void;

  /**
   * Updates the validate of the column
   */
  onColumnValidate: ({ columnId }: { columnId: string }) => void;

  /**
   * Updates the visibility of the column
   */
  onVisibilityChange: (columnId: string, value: boolean) => void;

  /**
   * Updates the order of the columns
   */
  onColumnDrag: (fromId: string, toId: string) => void;

  /**
   * Updates the order of the rows
   */
  onRowDrag: (fromId: string, toId: string) => void;

  /**
   * Pins or unpins a column
   */
  onPinColumn: (columnId: string, value: boolean) => void;

  /**
   * Selects or deselects all rows
   */
  onAllRowsSelected: (value: boolean) => void;

  /**
   * Selects or deselects a specific row
   */
  onRowSelect: (rowId: string, value: boolean) => void;

  /**
   * Expands or collapses all rows
   */
  onAllRowsExpand: (value: boolean) => void;

  /**
   * Expands or collapses a specific row
   */
  onRowExpand: (rowId: string, value: boolean) => void;

  /**
   * Resets column visibility to the default state
   */
  resetColumnVisibility: (value: boolean) => void;

  /**
   * Returns the current table values
   */
  getTableValues: () => ReturnType<typeof useReactTable>;

  /**
   * Returns the selected row IDs
   */
  getSelectedItems: () => string[];

  /**
   * Returns the expanded row IDs
   */
  getExpandedItems: () => string[];

  /**
   * Returns the current column visibility state
   */
  getHiddenColumns: () => Record<string, boolean>;
}

const DEFAULT_TABLE_OPTIONS: TableOptionProps = {
  enableSorting: true,
  enableResizing: true,
  enableHiding: true,
  enablePinning: true,
  enableOrdering: true,
  enableRowOrdering: true
};

export const DataTable = forwardRef<DataTableRef, TableProps>((props, ref) => {
  const {
    datasource,
    columns,
    showSerialNumber = true,
    showRowSelection = true,
    rowKey,
    selectedItems,
    rowHeight = 60,
    // loading = false,
    isVirtual = true,
    emptyState,
    expandable = {
      type: EXPANDABLE_TYPES.NONE,
      isExpandable: false,
      expandedRowKeys: [],
      expandedRowRender: null,
      expandEntireRowByClick: false
    },
    options = DEFAULT_TABLE_OPTIONS,
    onEndReached,
    onEventUpdate
  } = props;
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<DataTableRef>();

  const tableOptions = useMemo(
    () => ({
      ...DEFAULT_TABLE_OPTIONS,
      ...options
    }),
    [options]
  );

  const { expandableType, isExpandable, expandedRowKeys } = useMemo(() => {
    const {
      type: expandableType,
      isExpandable,
      expandedRowKeys = []
    } = expandable;
    return {
      expandableType,
      isExpandable,
      expandedRowKeys
    };
  }, [expandable]);

  const [data, setData] = useState<Array<object>>([]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setPinnedColumn] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const [tableHeight, setTableHeight] = useState<number>();

  useEffect(function updateTableHeight() {
    if (tableContainerRef.current) {
      setTableHeight(tableContainerRef.current.clientHeight);
    }
  }, []);

  useEffect(
    function updatedatasource() {
      setData(datasource);
    },
    [datasource]
  );

  const { modifiedColumns } = useMemo(
    function updatedColumns() {
      const pinningColumn = { left: [] as string[], right: [] as string[] };
      const {
        enableSorting: wholeEnableSorting,
        enableResizing: wholeEnableResizing,
        enableHiding: wholeEnableHiding,
        enablePinning: wholeEnablePinning,
        enableOrdering: wholeEnableOrdering
      } = tableOptions;

      const modifiedColumns = columns.map(
        ({
          Title,
          Id,
          Type,
          Render,
          enableSorting = true,
          enableResizing = true,
          enableHiding = true,
          enablePinning = true,
          enableOrdering = true,
          Width,
          MinWidth,
          MaxWidth,
          Footer,
          Fixed,
          ...rest
        }: ColumnProps) => {
          if (Fixed === "left") {
            pinningColumn.left.push(Id);
          } else if (Fixed === "right") {
            pinningColumn.right.push(Id);
          }
          return {
            header: Title,
            id: Id,
            accessorKey: Id,
            enableSorting: wholeEnableSorting && enableSorting,
            enableResizing: wholeEnableResizing && enableResizing,
            enableHiding: wholeEnableHiding && enableHiding,
            enablePinning: wholeEnablePinning && enablePinning,
            size: Width,
            maxSize: MaxWidth,
            footer: Footer,
            meta: {
              type: Type,
              enableOrdering: wholeEnableOrdering && enableOrdering,
              ...rest
            },
            ...(Render && {
              cell: ({ row }: { row: Row<object> }) => {
                const rowData = row.original as Row<object>;
                const onExpand = () => {
                  row.toggleExpanded();
                };
                return Render?.({
                  row: rowData,
                  onExpand,
                  onDone: ({ rowId, changedValue }) => {
                    tableRef.current?.onRowUpdate({
                      rowId,
                      changedValue
                    });
                    tableRef.current?.updateTableData?.({
                      type: UPDATED_EVENTS.CELL_EDIT,
                      value: { rowId, changedValue, columnId: Id }
                    });
                  }
                });
              }
            }),
            ...(MinWidth && { minSize: MinWidth }),
            ...(MaxWidth && { maxSize: MaxWidth })
          };
        }
      );

      if (showSerialNumber) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        modifiedColumns.unshift(SerialNumberColumn as any);
        pinningColumn.left.unshift(DEFAULT_KEYS.SELECT);
      }

      setColumnOrder(modifiedColumns.map((column) => column.id));

      setPinnedColumn(pinningColumn);

      return { modifiedColumns, pinningColumn };
    },
    [columns, showSerialNumber, tableOptions]
  );

  const arrayToFlags = useCallback((items: string[]) => {
    return items.reduce((acc: Record<string, boolean>, key) => {
      acc[key] = true;
      return acc;
    }, {});
  }, []);

  const selectedKeys = useMemo(() => {
    const selectedData = arrayToFlags(selectedItems || []);
    return selectedData;
  }, [selectedItems, arrayToFlags]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const expandedKeys = useMemo(() => {
    const expanedData = arrayToFlags(expandedRowKeys || []);
    return expanedData;
  }, [expandedRowKeys.join(",")]);

  useEffect(
    function updateSelectedKeys() {
      setRowSelection(selectedKeys);
    },
    [selectedKeys]
  );

  useEffect(
    function updateExpandedKeys() {
      isExpandable && setExpanded(expandedKeys);
    },
    [expandedKeys, isExpandable]
  );

  const table = useReactTable({
    data: data ?? [],
    columns: modifiedColumns as unknown as ColumnDef<object>[],
    defaultColumn,
    state: {
      columnOrder,
      columnPinning,
      rowSelection,
      expanded
    },
    initialState: {
      columnOrder,
      columnPinning,
      rowSelection: selectedKeys,
      expanded: expandedKeys
    },
    enableRowSelection: showRowSelection,
    enableExpanding: isExpandable,
    columnResizeMode: "onChange",
    getRowCanExpand: () => isExpandable,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setPinnedColumn,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getSubRows: (originalRow) => {
      if (isExpandable && expandableType === EXPANDABLE_TYPES.ROW) {
        return (originalRow as { subRows: Array<object> }).subRows;
      }
      return undefined;
    },
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    getRowId: (row: { [key: string]: any }) => row[rowKey as string],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: {
      enableRowOrdering: tableOptions?.enableRowOrdering
    }
  });

  useImperativeHandle(tableRef, () => ({
    getTableValues: () => table as ReturnType<typeof useReactTable>,
    getSelectedItems: () => {
      return Object.keys(table.getState().rowSelection || {});
    },
    getExpandedItems: () => {
      return Object.keys(table.getState().expanded || {});
    },
    getHiddenColumns: () => {
      return table.getState().columnVisibility || {};
    },
    onRowUpdate: ({ rowId, changedValue }) => {
      setData((prevData) => {
        const newData = [...prevData];
        const rowIndex = table.getRow(rowId).index;
        newData[rowIndex] = { ...newData[rowIndex], ...changedValue };
        return newData;
      });
    },
    onColumnValidate: (args) => {
      const columnId = args.columnId;
      const column = table.getColumn(columnId);
      return column?.columnDef?.meta?.validate?.(args) || [];
    },
    updateTableData: ({
      type,
      value
    }: { type: string; value: string | object | string[] }) => {
      onEventUpdate?.({ type, value });
    },
    onVisibilityChange: (columnId: string, value: boolean) => {
      const column = table.getColumn(columnId);
      column?.toggleVisibility(value);
    },
    onColumnDrag: (fromId: string, toId: string) => {
      console.log("Done Done");
      setColumnOrder((prevOrder) => {
        const oldIndex = prevOrder.indexOf(fromId);
        const newIndex = prevOrder.indexOf(toId);
        return arrayMove(prevOrder, oldIndex, newIndex);
      });
    },
    onRowDrag: (fromId: string, toId: string) => {
      console.log("Done Done onRowDrag", fromId, toId);
      setData((prevData) => {
        const oldIndex = table.getRow(fromId).index;
        const newIndex = table.getRow(toId).index;
        return arrayMove(prevData, oldIndex, newIndex);
      });
    },
    onPinColumn: (columnId: string, value: boolean) => {
      const column = table.getColumn(columnId);
      const pinned = value ? false : "left";
      column?.pin(pinned);
    },
    onAllRowsSelected: (value: boolean) => {
      table.toggleAllPageRowsSelected(value);
    },
    onRowSelect: (rowId: string, value: boolean) => {
      const row = table.getRow(rowId);
      row.toggleSelected(value);
    },
    onAllRowsExpand: (value: boolean) => {
      table.toggleAllRowsExpanded(value);
    },
    onRowExpand: (rowId: string, value: boolean) => {
      const row = table.getRow(rowId);
      row.toggleExpanded(value);
    },
    resetColumnVisibility: (value: boolean) => {
      table.resetColumnVisibility(value);
    }
  }));

  useImperativeHandle(ref, () => tableRef.current as DataTableRef, []);

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: table.getRowModel().rows.length,
    estimateSize: () => rowHeight, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly	    overscan: 10,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 10,
    enabled: isVirtual
  });

  function onScroll() {
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      const isBottom =
        tableContainer.scrollHeight - tableContainer.scrollTop ===
        tableContainer.clientHeight;
      if (isBottom) {
        console.log("Reached the bottom of the table!");
        onEndReached?.();
      }
    }
  }

  return (
    <TableProvider
      table={table as ReturnType<typeof useReactTable>}
      expandable={expandable}
      rowHeight={rowHeight}
      tableRef={tableRef.current as DataTableRef}
    >
      <div
        className="butterfly-components"
        style={{
          display: "grid",
          height: "inherit"
        }}
      >
        <div
          className="border border-gray-200 rounded-12 overflow-auto relative"
          ref={tableContainerRef}
          onScroll={onScroll}
          style={{ maxHeight: `${tableHeight}px` }}
        >
          <table className="grid border-collapse font-sans table-fixed tableContainer">
            <TableHeader />
            {data.length === 0 ? (
              <EmptyState emptyState={emptyState} />
            ) : (
              <TableBody
                rowVirtualizer={rowVirtualizer}
                isVirtual={isVirtual}
              />
            )}
          </table>
        </div>
      </div>
    </TableProvider>
  );
});

interface EmptyStateProps {
  emptyState?: ReactNode;
}

export function EmptyState({ emptyState }: EmptyStateProps) {
  return (
    emptyState || (
      <div className="text-center p-28 flex w-fit">No Data Available</div>
    )
  );
}

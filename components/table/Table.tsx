import {
  type ColumnDef,
  type ColumnOrderState,
  type ExpandedState,
  type GroupingState,
  type RowSelectionState,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ColumnProps, TableProps, TableRef } from "./Table.types.ts";
import { TableBody } from "./TableBody.tsx";
import { TableHeader } from "./TableHeader.tsx";
import { TableProvider } from "./TableProvider.tsx";
import { useDnD } from "./useDnD.ts";
import { useGrouping } from "./useGrouping.ts";
import { useNestableRows } from "./useNestableRows.ts";
import { useTableCore } from "./useTableCore.ts";
import { useVirtualization } from "./useVirtualization.ts";
import {
  createSerialNumberColumn,
  mapLegacyColumns,
} from "./utils/compatibilityLayer.tsx";
import { EXPANDABLE_TYPES } from "./utils/events.ts";
import { LoadingOverlay } from "./LoadingOverlay.tsx";
import { EmptyState } from "./EmptyState.tsx";

const DEFAULT_OPTIONS = {
  enableSorting: true,
  enableResizing: true,
  enableHiding: true,
  enablePinning: true,
  enableOrdering: true,
  enableRowOrdering: true,
};

/**
 * Advanced Table Component with virtualization, grouping, and DnD support
 * Maintains backward compatibility with existing column structure
 */
export const Table = forwardRef<TableRef, TableProps>((props, ref) => {
  const {
    datasource,
    data,
    columns,
    showSerialNumber = true,
    showRowSelection = true,
    rowKey = "id",
    selectedItems = [],
    rowHeight = 60,
    tableHeight = 600,
    loading = false,
    isVirtual = true,
    virtual = isVirtual,
    emptyState,
    expandable = {
      type: EXPANDABLE_TYPES.NONE,
      isExpandable: false,
      expandedRowKeys: [],
      expandedRowRender: null,
      expandEntireRowByClick: false,
    },
    options = DEFAULT_OPTIONS,
    groupBy = [],
    onEndReached,
    onEventUpdate,
    validateCellEdit,
    theme,
    editableCellComponents = {},
  } = props;

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [tableData, setTableData] = useState(data || datasource || []);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = useState({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [grouping, setGrouping] = useState<GroupingState>(groupBy);

  const tableOptions = useMemo(
    () => ({
      ...DEFAULT_OPTIONS,
      ...options,
    }),
    [options],
  );

  // Map legacy columns to TanStack format
  const mappedColumns = useMemo(() => {
    const mapped = mapLegacyColumns(columns, tableOptions);

    if (showSerialNumber) {
      mapped.unshift(createSerialNumberColumn(showRowSelection, tableOptions));
    }

    return mapped;
  }, [columns, showSerialNumber, showRowSelection, tableOptions]);

  // Initialize column order
  useEffect(() => {
    const order = mappedColumns.map((col) => col.id as string);
    setColumnOrder(order);
  }, [mappedColumns]);

  // Sync selected items
  useEffect(() => {
    const selection: RowSelectionState = {};
    selectedItems.forEach((id) => {
      selection[id] = true;
    });
    setRowSelection(selection);
  }, [selectedItems]);

  // Core table instance
  const table = useReactTable({
    data: tableData,
    columns: mappedColumns as ColumnDef<any>[],
    state: {
      columnOrder,
      columnPinning,
      rowSelection,
      expanded,
      grouping,
    },
    enableRowSelection: showRowSelection,
    enableExpanding: expandable.isExpandable,
    enableGrouping: groupBy.length > 0,
    columnResizeMode: "onChange",
    getRowId: (row: any) => row[rowKey],
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSubRows: (originalRow: any) => {
      if (expandable.isExpandable && expandable.type === EXPANDABLE_TYPES.ROW) {
        return originalRow.subRows;
      }
      return undefined;
    },
    meta: {
      enableRowOrdering: tableOptions?.enableRowOrdering,
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setTableData((old) =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row,
          ),
        );
      },
    },
  });

  // Custom hooks
  const virtualization = useVirtualization(
    table,
    virtual,
    rowHeight,
    tableContainerRef,
  );
  // const tableCore = useTableCore(table, onEventUpdate);
  const groupingHook = useGrouping(table, groupBy);
  const nestableRows = useNestableRows(table, expandable);
  const dnd = useDnD(table, { enabled: true });

  // Imperative API
  useImperativeHandle(
    ref,
    () => ({
      // Legacy methods (preserve exactly)
      onRowUpdate: ({ rowId, changedValue }) => {
        const row = table.getRow(rowId);
        const rowIndex = row.index;
        setTableData((old) =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, ...changedValue } : row,
          ),
        );
      },

      updateTableData: ({ type, value }) => {
        onEventUpdate?.({ type, value });
      },

      onColumnValidate: ({ columnId }) => {
        const column = table.getColumn(columnId);
        // Type assertion to allow 'validate' on meta
        const validateFn = (
          column?.columnDef?.meta as { validate?: (colId: string) => any[] }
        )?.validate;
        return validateFn?.(columnId) || [];
      },

      onVisibilityChange: (columnId: string, value: boolean) => {
        table.getColumn(columnId)?.toggleVisibility(value);
      },

      onColumnDrag: (fromId: string, toId: string) => {
        const fromIndex = columnOrder.indexOf(fromId);
        const toIndex = columnOrder.indexOf(toId);
        const newOrder = [...columnOrder];
        newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, fromId);
        setColumnOrder(newOrder);
      },

      onRowDrag: (fromId: string, toId: string) => {
        const fromIndex = table.getRow(fromId).index;
        const toIndex = table.getRow(toId).index;
        setTableData((old) => {
          const newData = [...old];
          const [removed] = newData.splice(fromIndex, 1);
          newData.splice(toIndex, 0, removed);
          return newData;
        });
      },

      onPinColumn: (columnId: string, value: boolean) => {
        table.getColumn(columnId)?.pin(value ? "left" : false);
      },

      onAllRowsSelected: (value: boolean) => {
        table.toggleAllRowsSelected(value);
      },

      onRowSelect: (rowId: string, value: boolean) => {
        table.getRow(rowId).toggleSelected(value);
      },

      onAllRowsExpand: (value: boolean) => {
        table.toggleAllRowsExpanded(value);
      },

      onRowExpand: (rowId: string, value: boolean) => {
        table.getRow(rowId).toggleExpanded(value);
      },

      resetColumnVisibility: (value: boolean) => {
        table.resetColumnVisibility(value);
      },

      getTableValues: () => table,

      getSelectedItems: () => Object.keys(rowSelection),

      getExpandedItems: () => Object.keys(expanded),

      getHiddenColumns: () => table.getState().columnVisibility || {},

      // Enhanced methods
      addRow: (row: any, index?: number) => {
        setTableData((old) => {
          const newData = [...old];
          if (index !== undefined) {
            newData.splice(index, 0, row);
          } else {
            newData.push(row);
          }
          return newData;
        });
      },

      removeRow: (rowId: string) => {
        setTableData((old) => old.filter((row) => row[rowKey] !== rowId));
      },

      updateRow: (rowId: string, data: any) => {
        setTableData((old) =>
          old.map((row) => (row[rowKey] === rowId ? { ...row, ...data } : row)),
        );
      },

      getRowById: (rowId: string) => {
        try {
          return table.getRow(rowId);
        } catch {
          return null;
        }
      },

      getVisibleRows: () => table.getRowModel().rows,

      applyEdit: (rowId: string, columnId: string, value: any) => {
        const row = table.getRow(rowId);
        const rowIndex = row.index;
        setTableData((old) =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row,
          ),
        );
      },

      reorderCells: (rowId: string, fromIndex: number, toIndex: number) => {
        // Implementation for cell reordering within a row
        console.log("Cell reorder not yet implemented");
      },

      reorderRows: (fromId: string, toId: string) => {
        const fromIndex = table.getRow(fromId).index;
        const toIndex = table.getRow(toId).index;
        setTableData((old) => {
          const newData = [...old];
          const [removed] = newData.splice(fromIndex, 1);
          newData.splice(toIndex, 0, removed);
          return newData;
        });
      },

      expandRow: (rowId: string) => {
        table.getRow(rowId).toggleExpanded(true);
      },

      collapseRow: (rowId: string) => {
        table.getRow(rowId).toggleExpanded(false);
      },

      expandAll: () => {
        table.toggleAllRowsExpanded(true);
      },

      collapseAll: () => {
        table.toggleAllRowsExpanded(false);
      },

      openGroup: (groupId: string) => {
        // Implementation for group opening
        console.log("Group operations not yet implemented");
      },

      closeGroup: (groupId: string) => {
        // Implementation for group closing
        console.log("Group operations not yet implemented");
      },

      setGroupBy: (fields: string[]) => {
        setGrouping(fields);
      },

      selectRow: (rowId: string, selected = true) => {
        table.getRow(rowId).toggleSelected(selected);
      },

      selectAll: (selected = true) => {
        table.toggleAllRowsSelected(selected);
      },

      getSelectedRows: () => Object.keys(rowSelection),

      getTableState: () => table.getState(),

      resetTable: () => {
        table.resetColumnFilters();
        table.resetColumnOrder();
        table.resetColumnPinning();
        table.resetColumnSizing();
        table.resetColumnVisibility();
        table.resetExpanded();
        table.resetGlobalFilter();
        table.resetRowSelection();
        table.resetSorting();
      },
    }),
    [table, columnOrder, rowSelection, expanded, onEventUpdate, rowKey],
  );

  // Scroll handler for infinite loading
  const handleScroll = useCallback(() => {
    if (!tableContainerRef.current || !onEndReached) return;

    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

    if (isNearBottom && !loading) {
      onEndReached();
    }
  }, [onEndReached, loading]);

  return (
    <TableProvider
      table={table}
      expandable={expandable}
      rowHeight={rowHeight}
      tableRef={ref as any}
      theme={theme}
      editableCellComponents={editableCellComponents}
    >
      <div className="advanced-table-container h-full flex flex-col">
        <div
          ref={tableContainerRef}
          className="table-scroll-container flex-1 overflow-auto border rounded-lg"
          onScroll={handleScroll}
        >
          <table className="advanced-table w-full border-collapse grid">
            <TableHeader />
            {tableData.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={mappedColumns.length}
                    className="empty-state p-8 text-center text-muted-foreground"
                  >
                    {emptyState || <EmptyState />}
                  </td>
                </tr>
              </tbody>
            ) : (
              <TableBody
                rowVirtualizer={virtualization.rowVirtualizer}
                isVirtual={virtual}
              />
            )}
          </table>
        </div>

        {loading && <LoadingOverlay />}
      </div>
    </TableProvider>
  );
});

Table.displayName = "Table";

export default Table;

// Export types for external usage
export type { TableProps, TableRef, ColumnProps };

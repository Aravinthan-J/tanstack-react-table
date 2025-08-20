import React, { useState } from "react";
import type { ColumnProps } from "../table";
import { EXPANDABLE_TYPES, Table } from "../index";

const nestedData = [
  {
    id: "1",
    name: "Engineering",
    type: "Department",
    count: 15,
    subRows: [
      {
        id: "1-1",
        name: "Frontend Team",
        type: "Team",
        count: 8,
      },
      {
        id: "1-2",
        name: "Backend Team",
        type: "Team",
        count: 7,
      },
    ],
  },
  {
    id: "2",
    name: "Design",
    type: "Department",
    count: 5,
    subRows: [
      { id: "2-1", name: "Alice Cooper", type: "Designer", count: 0 },
      { id: "2-2", name: "David Wilson", type: "Designer", count: 0 },
    ],
  },
];

const nestedColumns: ColumnProps[] = [
  {
    Id: "name",
    Title: "Name",
    Type: "text",
    Width: 300,
  },
  {
    Id: "type",
    Title: "Type",
    Type: "text",
    Width: 120,
  },
  {
    Id: "count",
    Title: "Count",
    Type: "number",
    Width: 100,
  },
];

export function NestedRowsTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>(["1"]);

  const handleEventUpdate = ({ type, value }: { type: string; value: any }) => {
    console.log("Nested table event:", type, value);

    if (type === "row-expand") {
      const { rowId, expanded } = value;
      setExpandedRows((prev) =>
        expanded ? [...prev, rowId] : prev.filter((id) => id !== rowId)
      );
    }
  };

  return (
    <Table
      datasource={nestedData}
      columns={nestedColumns}
      rowKey="id"
      selectedItems={[]}
      showSerialNumber={false}
      showRowSelection={false}
      isVirtual={false}
      rowHeight={50}
      loading={false}
      emptyState={<div>No nested data available</div>}
      expandable={{
        type: EXPANDABLE_TYPES.ROW,
        isExpandable: true,
        expandedRowKeys: expandedRows,
        expandedRowRender: null,
        expandEntireRowByClick: true,
      }}
      options={{
        enableSorting: true,
        enableResizing: true,
        enableHiding: true,
        enablePinning: false,
        enableOrdering: true,
        enableRowOrdering: false,
      }}
      onEventUpdate={handleEventUpdate}
      onEndReached={() => {}}
    />
  );
}

import React, { useState } from "react";
import type { ColumnProps } from "../../table/Table.types";
import { Table } from "../../table/index.tsx";

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
        subRows: [
          { id: "1-1-1", name: "John Doe", type: "Developer", count: 0 },
          { id: "1-1-2", name: "Jane Smith", type: "Developer", count: 0 },
        ],
      },
      {
        id: "1-2",
        name: "Backend Team",
        type: "Team",
        count: 7,
        subRows: [
          { id: "1-2-1", name: "Bob Johnson", type: "Developer", count: 0 },
        ],
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
        expanded ? [...prev, rowId] : prev.filter((id) => id !== rowId),
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
      showRowSelection={true}
      isVirtual={false}
      tableHeight={400}
      rowHeight={50}
      loading={false}
      emptyState={<div>No nested data available</div>}
      expandable={{
        type: "row",
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

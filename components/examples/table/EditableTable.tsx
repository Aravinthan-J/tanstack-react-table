import React, { useState } from "react";
import type { ColumnProps } from "../../table/Table.types";
import { Table } from "../../table/index.tsx";

const editableData = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    active: true,
    rating: 4,
    notes: "Senior developer with expertise in React and TypeScript.",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    active: false,
    rating: 5,
    notes: "UI/UX designer with a passion for user-centered design.",
  },
];

const editableColumns: ColumnProps[] = [
  {
    Id: "name",
    Title: "Name",
    Type: "text",
    Width: 200,
  },
  {
    Id: "email",
    Title: "Email",
    Type: "email",
    Width: 250,
  },
  {
    Id: "age",
    Title: "Age",
    Type: "number",
    Width: 100,
  },
  {
    Id: "active",
    Title: "Active",
    Type: "boolean",
    Width: 80,
  },
  {
    Id: "rating",
    Title: "Rating",
    Type: "rating",
    Width: 120,
  },
  {
    Id: "notes",
    Title: "Notes",
    Type: "textarea",
    Width: 300,
  },
];

export function EditableTable() {
  const [data, setData] = useState(editableData);

  const handleEventUpdate = ({ type, value }: { type: string; value: any }) => {
    console.log("Event Update:", type, value);

    if (type === "cell-edit") {
      const { rowId, columnId, newValue } = value;
      setData((prev) =>
        prev.map((row) =>
          row.id === rowId ? { ...row, [columnId]: newValue } : row,
        ),
      );
    }
  };

  return (
    <Table
      datasource={data}
      columns={editableColumns}
      rowKey="id"
      selectedItems={[]}
      showSerialNumber={true}
      showRowSelection={true}
      isVirtual={false}
      tableHeight={500}
      rowHeight={60}
      loading={false}
      emptyState={<div>No editable data available</div>}
      expandable={{
        type: "none",
        isExpandable: false,
        expandedRowKeys: [],
        expandedRowRender: null,
      }}
      options={{
        enableSorting: true,
        enableResizing: true,
        enableHiding: true,
        enablePinning: true,
        enableOrdering: true,
        enableRowOrdering: true,
      }}
      onEventUpdate={handleEventUpdate}
      onEndReached={() => {
        console.log("End reached");
      }}
    />
  );
}

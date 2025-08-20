import React, { useState } from "react";
import type { ColumnProps } from "../table";
import { CELL_TYPES, Table } from "../index";

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
  {
    id: "3",
    name: "Carlos Rodriguez",
    email: "carlos@example.com",
    age: 28,
    active: true,
    rating: 3,
    notes: "Backend developer specializing in Node.js and databases.",
  },
  {
    id: "4",
    name: "Mia Lee",
    email: "mia@example.com",
    age: 32,
    active: true,
    rating: 5,
    notes: "Team lead with experience in agile project management.",
  },
  {
    id: "5",
    name: "Liam Patel",
    email: "liam@example.com",
    age: 27,
    active: false,
    rating: 2,
    notes: "Junior QA tester enthusiastic about automation.",
  },
  {
    id: "6",
    name: "Emma Chen",
    email: "emma@example.com",
    age: 24,
    active: true,
    rating: 4,
    notes: "Frontend intern learning React and CSS best practices.",
  },
  {
    id: "7",
    name: "Noah Kim",
    email: "noah@example.com",
    age: 35,
    active: true,
    rating: 3,
    notes: "DevOps engineer focusing on CI/CD pipelines.",
  },
  {
    id: "8",
    name: "Olivia Thomas",
    email: "olivia@example.com",
    age: 29,
    active: false,
    rating: 5,
    notes: "Product owner with a knack for customer feedback integration.",
  },
  {
    id: "9",
    name: "Isaac Brown",
    email: "isaac@example.com",
    age: 31,
    active: true,
    rating: 4,
    notes: "Cloud specialist, adept at AWS and GCP services.",
  },
  {
    id: "10",
    name: "Sophia Wilson",
    email: "sophia@example.com",
    age: 26,
    active: true,
    rating: 2,
    notes: "Support engineer eager to resolve user challenges.",
  },
];

const editableColumns: ColumnProps[] = [
  {
    Id: "name",
    Title: "Name",
    Type: CELL_TYPES.TEXT,
    Width: 200,
  },
  {
    Id: "email",
    Title: "Email",
    Type: CELL_TYPES.EMAIL,
    Width: 250,
  },
  {
    Id: "age",
    Title: "Age",
    Type: CELL_TYPES.NUMBER,
    Width: 100,
  },
  {
    Id: "active",
    Title: "Active",
    Type: CELL_TYPES.BOOLEAN,
    Width: 80,
  },
  {
    Id: "rating",
    Title: "Rating",
    Type: CELL_TYPES.RATING,
    Width: 120,
  },
  {
    Id: "notes",
    Title: "Notes",
    Type: CELL_TYPES.TEXTAREA,
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
          row.id === rowId ? { ...row, [columnId]: newValue } : row
        )
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

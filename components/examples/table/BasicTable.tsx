import React from "react";
import { Table } from "../../table/index.tsx";
import type { ColumnProps } from "../../table/Table.types";

const sampleData = [
  { id: "1", name: "John Doe", email: "john@example.com", age: 30 },
  { id: "2", name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", age: 35 },
];

const columns: ColumnProps[] = [
  {
    Id: "name",
    Title: "Name",
    Type: "text",
    Width: 200,
    enableSorting: true,
    enableResizing: true,
  },
  {
    Id: "email",
    Title: "Email",
    Type: "email",
    Width: 250,
    enableSorting: true,
  },
  {
    Id: "age",
    Title: "Age",
    Type: "number",
    Width: 100,
    enableSorting: true,
  },
];

export function BasicTable() {
  return (
    <Table
      datasource={sampleData}
      columns={columns}
      rowKey="id"
      selectedItems={[]}
      showSerialNumber={true}
      showRowSelection={true}
      isVirtual={false}
      tableHeight={400}
      rowHeight={50}
      loading={false}
      emptyState={<div>No data available</div>}
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
      onEventUpdate={({ type, value }) => {
        console.log("Event:", type, value);
      }}
      onEndReached={() => {
        console.log("End reached");
      }}
    />
  );
}

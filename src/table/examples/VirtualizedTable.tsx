import React, { useEffect, useState } from "react";
import type { ColumnProps } from "../table";
import { Table } from "../index";

// Generate large dataset
const generateLargeDataset = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `row-${index}`,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    age: Math.floor(Math.random() * 50) + 18,
    department: ["Engineering", "Design", "Marketing", "Sales"][
      Math.floor(Math.random() * 4)
    ],
    salary: Math.floor(Math.random() * 100000) + 50000,
    active: Math.random() > 0.3,
  }));
};

const virtualColumns: ColumnProps[] = [
  {
    Id: "name",
    Title: "Name",
    Type: "text",
    Width: 150,
  },
  {
    Id: "email",
    Title: "Email",
    Type: "email",
    Width: 200,
  },
  {
    Id: "age",
    Title: "Age",
    Type: "number",
    Width: 80,
  },
  {
    Id: "department",
    Title: "Department",
    Type: "text",
    Width: 120,
  },
  {
    Id: "salary",
    Title: "Salary",
    Type: "number",
    Width: 120,
  },
  {
    Id: "active",
    Title: "Active",
    Type: "boolean",
    Width: 80,
  },
];

export function VirtualizedTable() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setData(generateLargeDataset(10000));
      setLoading(false);
    }, 1000);
  }, []);

  const handleEndReached = () => {
    if (!loading) {
      setLoading(true);
      // Simulate loading more data
      setTimeout(() => {
        setData((prev) => [...prev, ...generateLargeDataset(1000)]);
        setLoading(false);
      }, 500);
    }
  };

  return (
    <Table
      datasource={data}
      columns={virtualColumns}
      rowKey="id"
      selectedItems={[]}
      showSerialNumber={true}
      showRowSelection={true}
      isVirtual={true}
      rowHeight={50}
      loading={loading}
      emptyState={<div>Loading large dataset...</div>}
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
        console.log("Virtual table event:", type, value);
      }}
      onEndReached={handleEndReached}
    />
  );
}

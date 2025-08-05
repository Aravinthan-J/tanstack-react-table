import React from "react";
import { Table } from "../src";

// Define the expandable type constant if not exported from '../src'
const EXPANDABLE_ROW_TYPE = "ROW";
interface ComplexData {
  id: string;
  category: string;
  itemName: string;
  value: number;
  isAvailable: boolean;
  notes?: string;
  subItems?: { subId: string; subName: string; subValue: number }[];
}

const CustomValueCell = ({ row }: any) => {
  const value = row.original.value;
  return (
    <span
      style={{ fontWeight: "bold", color: value > 500 ? "purple" : "gray" }}
    >
      ${value.toFixed(2)}
    </span>
  );
};

const CustomNotesCell = ({ row, onDone }: any) => {
  const notes = row.original.notes;
  return (
    <div
      style={{
        fontStyle: "italic",
        maxWidth: "200px",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {notes || "N/A"}
    </div>
  );
};

const columns = [
  {
    Id: "category",
    Title: "Category",
    Type: "text",
  },
  {
    Id: "itemName",
    Title: "Item Name",
    Type: "text",
  },
  {
    Id: "value",
    Title: "Value",
    Type: "currency",
    Render: CustomValueCell,
  },
  {
    Id: "isAvailable",
    Title: "Available",
    Type: "boolean",
  },
  {
    Id: "notes",
    Title: "Notes",
    Type: "textarea",
    Render: CustomNotesCell,
  },
];

const datasource: ComplexData[] = [
  {
    id: "c1",
    category: "Electronics",
    itemName: "Smartphone",
    value: 899.99,
    isAvailable: true,
    notes: "Latest model with advanced features.",
    subItems: [{ subId: "s1", subName: "Charger", subValue: 20 }],
  },
  {
    id: "c2",
    category: "Books",
    itemName: "Sci-Fi Novel",
    value: 15.5,
    isAvailable: true,
    notes: "Bestselling author.",
  },
  {
    id: "c3",
    category: "Electronics",
    itemName: "Smartwatch",
    value: 299.0,
    isAvailable: false,
    notes: "Out of stock until next month.",
    subItems: [{ subId: "s2", subName: "Extra Band", subValue: 15 }],
  },
  {
    id: "c4",
    category: "Home Goods",
    itemName: "Coffee Maker",
    value: 120.0,
    isAvailable: true,
    notes: "Programmable with grinder.",
  },
];

const FullFeaturedTable = () => {
  return (
    <Table
      columns={columns}
      datasource={datasource}
      rowKey="id"
      showSerialNumber={true}
      showRowSelection={true}
      onEventUpdate={({ type, value }) => console.log(type, value)}
      onEndReached={() => console.log("End reached")}
      emptyState={<div>No data available</div>}
      isVirtual={false}
      tableHeight={600}
      selectedItems={[]}
      expandable={{
        type: EXPANDABLE_ROW_TYPE,
        isExpandable: true,
        expandedRowRender: (row) => {
          const original = row.original as ComplexData;
          return (
            <div style={{ padding: "10px", background: "#e0e0e0" }}>
              <h5>Sub-items for {original.itemName}</h5>
              {original.subItems && original.subItems.length > 0 ? (
                <ul>
                  {original.subItems.map((sub) => (
                    <li key={sub.subId}>
                      {sub.subName} - ${sub.subValue}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No sub-items.</p>
              )}
            </div>
          );
        },
      }}
      grouping={{
        enabled: true,
        groupBy: ["category"],
      }}
      striped={true}
      bordered={true}
      compact={false}
      hoverable={true}
      density="comfortable"
      rowHeight={48}
      options={{}}
    />
  );
};

export default FullFeaturedTable;

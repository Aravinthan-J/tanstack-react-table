import React from "react";
import { Table } from "../src";

interface UserData {
  id: string;
  name: string;
  age: number;
  city: string;
}

const columns = [
  {
    Id: "id",
    Title: "ID",
    Type: "text",
  },
  {
    Id: "name",
    Title: "Name",
    Type: "text",
  },
  {
    Id: "age",
    Title: "Age",
    Type: "number",
  },
  {
    Id: "city",
    Title: "City",
    Type: "text",
  },
];

const generateLargeDataset = (count: number): UserData[] => {
  const data: UserData[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: `user-${i + 1}`,
      name: `User ${i + 1}`,
      age: 20 + (i % 50),
      city: `City ${i % 10}`,
    });
  }
  return data;
};

const largeDatasource = generateLargeDataset(1000);
const smallDatasource = generateLargeDataset(10);

const VirtualNonVirtualTable = () => {
  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <h3>Non-Virtual Table (Small Dataset)</h3>
      <Table
        columns={columns}
        datasource={smallDatasource}
        rowKey="id"
        showSerialNumber={true}
        showRowSelection={true}
        onEventUpdate={({ type, value }) => console.log(type, value)}
        onEndReached={() => console.log("End reached")}
        emptyState={<div>No data available</div>}
        isVirtual={false} // Non-virtual
        tableHeight={300}
        rowHeight={50}
        selectedItems={[]}
        expandable={{
          type: "none",
          isExpandable: false,
        }}
        grouping={{
          enabled: false,
          groupBy: [],
        }}
        options={{}} // Add default options or customize as needed
      />

      <Table
        columns={columns}
        datasource={largeDatasource}
        rowKey="id"
        showSerialNumber={true}
        showRowSelection={true}
        onEventUpdate={({ type, value }) => console.log(type, value)}
        onEndReached={() => console.log("End reached")}
        emptyState={<div>No data available</div>}
        isVirtual={true} // Virtual
        tableHeight={500}
        rowHeight={50}
        selectedItems={[]}
        expandable={{
          type: "none",
          isExpandable: false,
        }}
        grouping={{
          enabled: false,
          groupBy: [],
        }}
        options={{}} // Add default options or customize as needed
      />
    </div>
  );
};

export default VirtualNonVirtualTable;

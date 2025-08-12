import { fireEvent, render, screen } from "@testing-library/react";
import { Table } from "../src/components/Table";

describe("Table Component", () => {
  const mockColumns = [
    { Id: "name", Title: "Name", Type: "text" },
    { Id: "email", Title: "Email", Type: "email" },
    { Id: "active", Title: "Active", Type: "boolean" },
  ];

  const mockData = [
    { id: "1", name: "John Doe", email: "john@example.com", active: true },
    { id: "2", name: "Jane Smith", email: "jane@example.com", active: false },
  ];

  test("renders table with data", () => {
    render(
      <Table
        columns={mockColumns}
        datasource={mockData}
        rowKey="id"
        selectedItems={[]}
        showSerialNumber={true}
        showRowSelection={true}
        emptyState="No data"
        onEventUpdate={() => {}}
        expandable={{ type: "none", isExpandable: false }}
        onEndReached={() => {}}
        isVirtual={false}
        tableHeight={600}
        rowHeight={60}
        options={{}}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  test("supports column compatibility", () => {
    const legacyColumns = [
      { Id: "col1", Title: "Column 1", Width: 200, enableSorting: true },
    ];

    render(
      <Table
        columns={legacyColumns}
        datasource={[{ id: "1", col1: "Value 1" }]}
        rowKey="id"
        selectedItems={[]}
        showSerialNumber={false}
        showRowSelection={false}
        emptyState="No data"
        onEventUpdate={() => {}}
        expandable={{ type: "none", isExpandable: false }}
        onEndReached={() => {}}
        isVirtual={false}
        tableHeight={600}
        rowHeight={60}
        options={{}}
      />,
    );

    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByText("Value 1")).toBeInTheDocument();
  });
});

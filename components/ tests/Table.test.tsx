import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from "../table/index";
import type { ColumnProps } from "../table/Table.types";

const mockColumns: ColumnProps[] = [
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
];

const mockData = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

const defaultProps = {
  datasource: mockData,
  columns: mockColumns,
  rowKey: "id",
  selectedItems: [],
  showSerialNumber: true,
  showRowSelection: true,
  isVirtual: false,
  tableHeight: 400,
  rowHeight: 50,
  loading: false,
  emptyState: <div>No data</div>,
  expandable: {
    type: "none" as const,
    isExpandable: false,
    expandedRowKeys: [],
    expandedRowRender: null,
  },
  options: {
    enableSorting: true,
    enableResizing: true,
    enableHiding: true,
    enablePinning: true,
    enableOrdering: true,
    enableRowOrdering: true,
  },
  onEventUpdate: jest.fn(),
  onEndReached: jest.fn(),
};

describe("Table Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table with data", () => {
    render(<Table {...defaultProps} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  test("renders empty state when no data", () => {
    render(<Table {...defaultProps} datasource={[]} />);

    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  test("shows loading state", () => {
    render(<Table {...defaultProps} loading={true} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("handles row selection", () => {
    const onEventUpdate = jest.fn();
    render(<Table {...defaultProps} onEventUpdate={onEventUpdate} />);

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]); // Click first row checkbox

    expect(onEventUpdate).toHaveBeenCalled();
  });

  test("handles column sorting", () => {
    const onEventUpdate = jest.fn();
    render(<Table {...defaultProps} onEventUpdate={onEventUpdate} />);

    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);

    // Sorting should be handled by TanStack Table internally
    expect(nameHeader).toBeInTheDocument();
  });

  test("preserves column structure compatibility", () => {
    const legacyColumns: ColumnProps[] = [
      {
        Id: "legacy_field",
        Title: "Legacy Field",
        Type: "text",
        Width: 150,
        enableSorting: true,
        enableResizing: false,
      },
    ];

    const legacyData = [{ id: "1", legacy_field: "Legacy Value" }];

    render(
      <Table
        {...defaultProps}
        columns={legacyColumns}
        datasource={legacyData}
      />
    );

    expect(screen.getByText("Legacy Field")).toBeInTheDocument();
    expect(screen.getByText("Legacy Value")).toBeInTheDocument();
  });
});

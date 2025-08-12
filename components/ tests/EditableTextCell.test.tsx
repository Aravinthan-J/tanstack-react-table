import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EditableTextCell } from "../table/cells";

describe("EditableTextCell", () => {
  const defaultProps = {
    value: "Test Value",
    onCommit: jest.fn(),
    onCancel: jest.fn(),
    onChange: jest.fn(),
    row: {} as any,
    column: {} as any,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders display value", () => {
    render(<EditableTextCell {...defaultProps} />);

    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  test("enters edit mode on click", async () => {
    render(<EditableTextCell {...defaultProps} />);

    const displayElement = screen.getByText("Test Value");
    fireEvent.click(displayElement);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Value")).toBeInTheDocument();
    });
  });

  test("commits value on Enter", async () => {
    const onCommit = jest.fn();
    render(<EditableTextCell {...defaultProps} onCommit={onCommit} />);

    const displayElement = screen.getByText("Test Value");
    fireEvent.click(displayElement);

    await waitFor(() => {
      const input = screen.getByDisplayValue("Test Value");
      fireEvent.change(input, { target: { value: "New Value" } });
      fireEvent.keyDown(input, { key: "Enter" });
    });

    expect(onCommit).toHaveBeenCalledWith("New Value");
  });

  test("cancels edit on Escape", async () => {
    const onCancel = jest.fn();
    render(<EditableTextCell {...defaultProps} onCancel={onCancel} />);

    const displayElement = screen.getByText("Test Value");
    fireEvent.click(displayElement);

    await waitFor(() => {
      const input = screen.getByDisplayValue("Test Value");
      fireEvent.change(input, { target: { value: "Changed" } });
      fireEvent.keyDown(input, { key: "Escape" });
    });

    expect(onCancel).toHaveBeenCalled();
  });

  test("respects readOnly prop", () => {
    render(<EditableTextCell {...defaultProps} readOnly={true} />);

    const displayElement = screen.getByText("Test Value");
    fireEvent.click(displayElement);

    // Should not enter edit mode
    expect(screen.queryByDisplayValue("Test Value")).not.toBeInTheDocument();
  });
});

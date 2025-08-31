# tanstack-react-table

A production-ready, highly customizable React table component built with [TanStack Table](https://tanstack.com/table), [Radix UI](https://www.radix-ui.com/), DnD Kit, and TypeScript. Feature-rich, accessible, performant, and designed for real business needs.

---

## 🚀 Features

- **High Performance:** Virtualized rendering for massive datasets (10k+ rows)
- **Editable Cells:** Radix UI-based editors (text, number, select, date, boolean, rating, textarea)
- **Drag & Drop:** Column and row reordering with DnD Kit
- **Nested Rows:** Expand/collapse hierarchical data
- **Column Management:** Resizing, hiding, pinning, and reordering columns
- **Theming:** Easy theming with Tailwind CSS and Radix states
- **Accessibility:** Full keyboard navigation and screen reader support
- **TypeScript:** Complete type safety with rich interfaces
- **Backward Compatible:** Drop-in replacement for existing column/data structures

---

## 📦 Installation

```
npm install tanstack-react-table
# or
yarn add tanstack-react-table
# or
bun add tanstack-react-table
```

> **Peer dependencies:**
>
> - `react` ^18
> - `react-dom` ^18
> - `@tanstack/react-table` ^8

---

## ⚡ Quick Start

```
import React from "react";
import { TableComponent } from "tanstack-react-table";
import type { ColumnProps } from "tanstack-react-table";

const columns: ColumnProps[] = [
  {
    id: "name",
    header: "Name",
    type: "text",
    width: 200,
  },
  {
    id: "email",
    header: "Email",
    type: "email",
    width: 250,
  },
  {
    id: "age",
    header: "Age",
    type: "number",
    width: 100,
  },
];

const data = [
  { id: "1", name: "John Doe", email: "john@example.com", age: 30 },
  { id: "2", name: "Jane Smith", email: "jane@example.com", age: 25 },
];

function MyTable() {
  return (
     {
        console.log("Event:", type, value);
      }}
      onEndReached={() => {}}
    />
  );
}
```

---

## 🔢 Supported Cell Types

Built-in Radix UI-based cell editors:

- **text**: Basic input with validation
- **number**: Arrow stepper
- **email**: Email input and mailto links
- **textarea**: Multi-line editing
- **select**: Dropdown menu with search
- **date**: Calendar picker
- **boolean**: Toggle switch
- **rating**: Star rating
- **readonly**: Display only

---

## 🛠️ Column Definition

| Prop             | Type                                       | Description                                                       |
| ---------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| `Id`             | `string`                                   | Unique identifier for the column.                                 |
| `Title`          | `string` \| `ReactNode`                    | Display title of the column.                                      |
| `Type`           | `string`                                   | Optional data type of the column.                                 |
| `Render`         | `({ row, onExpand, onDone }) => ReactNode` | Optional custom render function for the column cell.              |
| `Fixed`          | `string` \| `null`                         | Optional fixed position for the column (e.g., 'left' or 'right'). |
| `enableSorting`  | `boolean`                                  | Enable sorting functionality for the column.                      |
| `enableResizing` | `boolean`                                  | Enable resizing functionality for the column.                     |
| `enableHiding`   | `boolean`                                  | Enable hiding functionality for the column.                       |
| `enablePinning`  | `boolean`                                  | Enable pinning functionality for the column.                      |
| `enableOrdering` | `boolean`                                  | Enable ordering functionality for the column.                     |
| `Width`          | `number`                                   | Initial width of the column.                                      |
| `MinWidth`       | `number`                                   | Minimum width the column can be resized to.                       |
| `MaxWidth`       | `number`                                   | Maximum width the column can be resized to.                       |
| `Footer`         | `() => ReactNode`                          | Optional custom footer renderer for the column.                   |
| `Header`         | `() => ReactNode`                          | Optional custom header renderer for the column.                   |

---

## 🏗️ Advanced Usage

### **Virtualization**

Efficient rendering for huge datasets:

```
<TableComponent dataSource={largeData} columns={columns} isVirtual={true} rowHeight={50} />

```

### **Nested Rows/Tree Table**

```
const nestedData = [
  {
    id: "1",
    name: "Parent Row",
    subRows: [
      { id: "1-1", name: "Child Row 1" },
      { id: "1-2", name: "Child Row 2" },
    ],
  },
];


```

### **Custom Cell Components**

```
import { MyCustomCell } from "./MyCustomCell";


```

### **Theming**

Use your own or built-in Tailwind themes, Radix states, or external theme libraries.

---

## 📑 API Reference

| Prop               | Type                        | Description                                                                                  |
| ------------------ | --------------------------- | -------------------------------------------------------------------------------------------- |
| `selectedItems`    | `Array<string>`             | Selected items in the table.                                                                 |
| `showSerialNumber` | `boolean`                   | Show or hide the serial number column.                                                       |
| `showRowSelection` | `boolean`                   | Show or hide the row selection column.                                                       |
| `columns`          | `Array<ColumnProps>`        | Array of column properties.                                                                  |
| `datasource`       | `Array<object>`             | Array of data objects.                                                                       |
| `emptyState`       | `ReactNode`                 | Empty state component.                                                                       |
| `onEventUpdate`    | `({ type, value }) => void` | Callback function when the user makes a change to the table.                                 |
| `rowKey`           | `string`                    | Key of the column to be used as the row key.                                                 |
| `expandable`       | `ExpandableProps`           | Expandable props.                                                                            |
| `onEndReached`     | `() => void`                | Callback function to fetch the next page of data when the user reaches the end of the table. |
| `loading`          | `boolean`                   | Flag to indicate if the table is loading.                                                    |
| `isVirtual`        | `boolean`                   | Flag to indicate if the table is vitrual.                                                    |
| `rowHeight`        | `number`                    | Height of each row.                                                                          |
| `options`          | `TableOptionProps`          | Table options.                                                                               |
| `theme`            | `LargeThemeConfig`          | Custom theme for the table.                                                                  |
| `tableId`          | `string`                    | Its used to get the table id.                                                                |

### ExpandableProps

| Prop                     | Type                                              | Description                                              |
| ------------------------ | ------------------------------------------------- | -------------------------------------------------------- |
| `type`                   | `string`                                          | Type of expansion (e.g., 'accordion', 'row').            |
| `isExpandable`           | `boolean`                                         | Determines if the row is expandable.                     |
| `expandEntireRowByClick` | `boolean`                                         | Optional: Expands the entire row upon click.             |
| `expandedRowKeys`        | `Array<string>`                                   | Optional: Keys of the rows that are expanded by default. |
| `expandedRowRender`      | `((row: Row<object>) => React.ReactNode) \| null` | Optional custom renderer for expanded rows.              |

### TableOptionProps

| Prop                | Type      | Description                                         |
| ------------------- | --------- | --------------------------------------------------- |
| `enableSorting`     | `boolean` | Enables sorting functionality for the all columns.  |
| `enableResizing`    | `boolean` | Enables resizing functionality for the all columns. |
| `enableHiding`      | `boolean` | Enables hiding functionality for the all columns.   |
| `enablePinning`     | `boolean` | Enables pinning functionality for the all columns.  |
| `enableOrdering`    | `boolean` | Enables ordering functionality for the all columns. |
| `enableRowOrdering` | `boolean` | Enables row ordering functionality for the table.   |

### DataTableRef

| Prop                    | Type                                     | Description                                    |
| ----------------------- | ---------------------------------------- | ---------------------------------------------- |
| `onRowUpdate`           | `({ rowId, changedValue }) => void`      | Updates the data of the table.                 |
| `updateTableData`       | `({ type, value }) => void`              | Updates the table data.                        |
| `onColumnValidate`      | `({ columnId }) => void`                 | Updates the validate of the column.            |
| `onVisibilityChange`    | `(columnId, value) => void`              | Updates the visibility of the column.          |
| `onColumnDrag`          | `(fromId, toId) => void`                 | Updates the order of the columns.              |
| `onRowDrag`             | `(fromId, toId) => void`                 | Updates the order of the rows.                 |
| `onPinColumn`           | `(columnId, value) => void`              | Pins or unpins a column.                       |
| `onAllRowsSelected`     | `(value) => void`                        | Selects or deselects all rows.                 |
| `onRowSelect`           | `(rowId, value) => void`                 | Selects or deselects a specific row.           |
| `onAllRowsExpand`       | `(value) => void`                        | Expands or collapses all rows.                 |
| `onRowExpand`           | `(rowId, value) => void`                 | Expands or collapses a specific row.           |
| `resetColumnVisibility` | `(value) => void`                        | Resets column visibility to the default state. |
| `getTableValues`        | `() => ReturnType<typeof useReactTable>` | Returns the current table values.              |
| `getSelectedItems`      | `() => string[]`                         | Returns the selected row IDs.                  |
| `getExpandedItems`      | `() => string[]`                         | Returns the expanded row IDs.                  |
| `getHiddenColumns`      | `() => Record<string, boolean>`          | Returns the current column visibility state.   |

---

## 📣 Events

```
const handleEventUpdate = ({ type, value }) => {
  switch (type) {
    case "UPDATE_EVENTS.CELL_EDIT": /* ... */ break;
    case "row-select": /* ... */ break;
    case "column-resize": /* ... */ break;
    // ...
  }
};
```

---

## 💡 Performance Tips

1. Use virtualization for datasets >1,000 rows
2. Memoize event handlers
3. Batch row updates
4. Optimize custom renderers with `React.memo`
5. Use stable `rowKey`

---

## 🔧 Troubleshooting

### Common Issues

**Q: Table not rendering properly?**
A: Ensure all peer dependencies are installed and check console for TypeScript errors.

**Q: Custom renderers causing performance issues?**
A: Wrap custom components with `React.memo` and avoid creating new objects/functions in render.

**Q: Virtualization not working?**
A: Make sure `isVirtual={true}` and `rowHeight` is set to a consistent value.

**Q: Column resizing not working?**
A: Ensure `enableResizing: true` is set on column definitions and container has defined width.

---

## 🧑‍💻 Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build the library
bun run build

# Run tests
bun test

# Lint and fix code
bun run lint
bun run format

# Type checking
bun run typecheck

# Generate documentation
bun run docs
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feat/new-feature`)
3. **Follow coding standards** (Biome)
4. **Add tests** for new functionality
5. **Update documentation** as needed
6. **Commit changes** (`git commit -m "Add new feature"`)
7. **Push to GitHub** (`git push origin feat/new-feature`)
8. **Open a Pull Request**

---

### Development Guidelines

- Follow TypeScript best practices
- Maintain backward compatibility
- Add unit tests for new features
- Update README for API changes
- Use conventional commit messages

---

## 📊 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

---

## 🗂️ Examples

Check out our comprehensive examples in the `/examples` directory:

- [Basic Table](./examples/basic-table)
- [Editable Cells](./examples/editable-cells)
- [Virtualized Table](./examples/virtualized-table)
- [Nested Rows](./examples/nested-rows)
- [Custom Renderers](./examples/custom-renderers)
- [Column Management](./examples/column-management)

---

## 📝 License

MIT License – see the [LICENSE](LICENSE) file for details.

---

## 📚 Links

- **[GitHub Repository](https://github.com/Aravinthan-J/tanstack-react-table)**
- **[Documentation](https://github.com/Aravinthan-J/tanstack-react-table/docs)**
- **[Examples](https://github.com/Aravinthan-J/tanstack-react-table/examples)**
- **[TanStack Table Docs](https://tanstack.com/table/v8)**
- **[Radix UI Docs](https://www.radix-ui.com/)**
- **[Tailwind CSS Docs](https://tailwindcss.com/)**

---

## 🙏 Acknowledgments

Built with ❤️ using:
- [TanStack Table](https://tanstack.com/table) - Headless table utilities
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [DnD Kit](https://dndkit.com/) - Drag and drop utilities
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

&copy; 2025 Aravinthan

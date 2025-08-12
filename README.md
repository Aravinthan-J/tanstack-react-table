# Advanced Table Library

A production-ready, highly customizable React table component built with TanStack Table, Radix UI, and TypeScript. Features virtualization, drag-and-drop, inline editing, and complete backward compatibility.

## Features

- 🚀 **High Performance**: Virtualization support for large datasets (10k+ rows)
- ✏️ **Inline Editing**: Radix UI-based editable cells (text, number, email, textarea, select, date, boolean, rating)
- 🎯 **Drag & Drop**: Row and column reordering with @dnd-kit
- 🌳 **Nested Rows**: Hierarchical data with expand/collapse functionality
- 🎨 **Theming**: Built-in themes with Shadcn UI compatibility
- 📱 **Accessibility**: Full keyboard navigation and screen reader support
- 🔧 **TypeScript**: Complete type safety with comprehensive interfaces
- 🔄 **Backward Compatible**: Drop-in replacement for existing table implementations

## Installation

```bash
npm install @yourorg/advanced-table
# or
yarn add @yourorg/advanced-table
# or
bun add @yourorg/advanced-table
```

## Quick Start

```tsx
import React from "react";
import { Table } from "@yourorg/advanced-table";
import type { ColumnProps } from "@yourorg/advanced-table";

const columns: ColumnProps[] = [
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
];

const data = [
  { id: "1", name: "John Doe", email: "john@example.com", age: 30 },
  { id: "2", name: "Jane Smith", email: "jane@example.com", age: 25 },
];

function MyTable() {
  return (
    <Table
      datasource={data}
      columns={columns}
      rowKey="id"
      selectedItems={[]}
      showSerialNumber={true}
      showRowSelection={true}
      isVirtual={false}
      tableHeight={400}
      rowHeight={50}
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
      onEndReached={() => {}}
    />
  );
}
```

## Column Types

### Supported Cell Types

The library includes built-in Radix UI-based cell editors:

- **text**: Basic text input with validation
- **number**: Number input with arrow key increment/decrement
- **email**: Email input with validation and mailto links
- **textarea**: Multi-line text editor in a dialog
- **select**: Dropdown selection with search
- **date**: Date picker with calendar
- **boolean**: Toggle switch
- **rating**: Star rating component
- **readonly**: Read-only display

### Column Definition

```tsx
interface ColumnProps {
  Id: string; // Unique identifier
  Title: string | JSX.Element; // Column header
  Type?: string; // Cell type (text, number, email, etc.)
  Width?: number; // Column width
  MinWidth?: number; // Minimum width
  MaxWidth?: number; // Maximum width
  enableSorting?: boolean; // Enable sorting
  enableResizing?: boolean; // Enable column resizing
  enableHiding?: boolean; // Enable column hiding
  enablePinning?: boolean; // Enable column pinning
  enableOrdering?: boolean; // Enable column reordering
  Render?: (props) => JSX.Element; // Custom cell renderer
  Header?: () => JSX.Element; // Custom header renderer
  Footer?: () => JSX.Element; // Custom footer renderer
  Fixed?: string | null; // Pin column ('left' or 'right')
  meta?: Record<string, any>; // Additional metadata
}
```

## Advanced Features

### Virtualization

For large datasets, enable virtualization:

```tsx
<Table
  datasource={largeDataset}
  columns={columns}
  isVirtual={true}
  tableHeight={600}
  rowHeight={50}
  // ... other props
/>
```

### Nested Rows

Support for hierarchical data:

```tsx
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

<Table
  datasource={nestedData}
  expandable={{
    type: "row",
    isExpandable: true,
    expandedRowKeys: ["1"],
    expandEntireRowByClick: true,
  }}
  // ... other props
/>;
```

### Custom Cell Components

Register custom cell components:

```tsx
import { MyCustomCell } from "./MyCustomCell";

<Table
  editableCellComponents={{
    custom: MyCustomCell,
  }}
  // ... other props
/>;
```

### Theming

Use built-in themes or create custom ones:

```tsx
import { shadcnTheme } from "@yourorg/advanced-table/themes";

<Table
  theme={shadcnTheme}
  // ... other props
/>;
```

## Migration from Legacy Table

The library maintains 100% backward compatibility with existing column structures. No changes needed to your existing column definitions!

### Before (Legacy)

```tsx
const columns = [
  {
    Id: "name",
    Title: "Name",
    Type: "text",
    Width: 200,
    enableSorting: true,
  },
];
```

### After (New Library)

```tsx
// Exact same column definition works!
const columns = [
  {
    Id: "name",
    Title: "Name",
    Type: "text",
    Width: 200,
    enableSorting: true,
  },
];
```

## API Reference

### Table Props

| Prop               | Type               | Description                 |
| ------------------ | ------------------ | --------------------------- |
| `datasource`       | `Array<any>`       | Table data                  |
| `columns`          | `ColumnProps[]`    | Column definitions          |
| `rowKey`           | `string`           | Unique row identifier field |
| `selectedItems`    | `string[]`         | Selected row IDs            |
| `showSerialNumber` | `boolean`          | Show row numbers            |
| `showRowSelection` | `boolean`          | Show selection checkboxes   |
| `isVirtual`        | `boolean`          | Enable virtualization       |
| `tableHeight`      | `number`           | Table container height      |
| `rowHeight`        | `number`           | Height of each row          |
| `loading`          | `boolean`          | Show loading state          |
| `emptyState`       | `ReactNode`        | Content when no data        |
| `expandable`       | `ExpandableProps`  | Row expansion config        |
| `options`          | `TableOptionProps` | Feature toggles             |
| `onEventUpdate`    | `Function`         | Event handler               |
| `onEndReached`     | `Function`         | Infinite scroll handler     |

### Table Ref Methods

```tsx
const tableRef = useRef<TableRef>(null);

// Access table methods
tableRef.current?.addRow(newRow);
tableRef.current?.removeRow("row-id");
tableRef.current?.updateRow("row-id", { name: "New Name" });
tableRef.current?.expandRow("row-id");
tableRef.current?.selectRow("row-id", true);
tableRef.current?.getSelectedRows();
```

## Events

The table emits events for all user interactions:

```tsx
const handleEventUpdate = ({ type, value }) => {
  switch (type) {
    case "cell-edit":
      // Handle cell value changes
      break;
    case "row-select":
      // Handle row selection
      break;
    case "column-resize":
      // Handle column resizing
      break;
    // ... more event types
  }
};
```

## Performance Tips

1. **Use virtualization** for datasets > 1000 rows
2. **Memoize event handlers** to prevent unnecessary re-renders
3. **Batch updates** when modifying multiple rows
4. **Optimize column renderers** with React.memo
5. **Use row keys** that don't change between renders

## Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build library
bun run build

# Run tests
bun test

# Run E2E tests
bun run test:e2e

# Lint code
bun run lint

# Type check
bun run typecheck
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://docs.yourorg.com/advanced-table)
- 🐛 [Issue Tracker](https://github.com/yourorg/advanced-table/issues)
- 💬 [Discussions](https://github.com/yourorg/advanced-table/discussions)

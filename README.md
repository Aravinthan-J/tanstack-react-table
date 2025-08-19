# tanstack-react-table

A production-ready, highly customizable React table component built with [TanStack Table](https://tanstack.com/table), [Radix UI](https://www.radix-ui.com/), DnD Kit, and TypeScript. Feature-rich, accessible, performant, and designed for real business needs.

---

## 🚀 Features

- **High Performance:** Virtualized rendering for massive datasets (10k+ rows)
- **Editable Cells:** Radix UI-based editors (text, number, select, date, boolean, rating, textarea)
- **Drag & Drop:** Column and row reordering with DnD Kit
- **Nested Rows:** Expand/collapse hierarchical data
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
> - `react` ^19
> - `react-dom` ^19
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

```
interface ColumnProps {
  id: string; // Unique key
  header: string | JSX.Element; // Header cell
  type?: string; // text | number | select | etc.
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  enableSorting?: boolean;
  enableResizing?: boolean;
  enableHiding?: boolean;
  enablePinning?: boolean;
  enableOrdering?: boolean;
  render?: (props) => JSX.Element; // Custom cell renderer
  headerRender?: () => JSX.Element; // Custom header
  footerRender?: () => JSX.Element; // Custom footer
  fixed?: "left" | "right";
  meta?: Record;
}
```

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

| Prop               | Type            | Description                    |
| ------------------ | --------------- | ------------------------------ |
| `dataSource`       | `Array`         | Table data                     |
| `columns`          | `ColumnProps[]` | Column definitions             |
| `rowKey`           | `string`        | Unique ID key for rows         |
| `showSerialNumber` | `boolean`       | Show row numbers               |
| `showRowSelection` | `boolean`       | Show checkboxes for selection  |
| `isVirtual`        | `boolean`       | Enable virtualized rendering   |
| `rowHeight`        | `number`        | Row height (px)                |
| `expandable`       | `object`        | Tree/row expansion config      |
| `options`          | `object`        | Feature toggles (sorting, etc) |
| `onEventUpdate`    | `function`      | Event callback                 |
| `onEndReached`     | `function`      | Infinite scroll callback       |

## Exposed Table Ref Methods

```
const tableRef = useRef(null);
// Usage:
tableRef.current?.addRow(newRow);
tableRef.current?.removeRow("row-id");
tableRef.current?.updateRow("row-id", { name: "Changed" });
tableRef.current?.expandRow("row-id");
tableRef.current?.selectRow("row-id", true);
tableRef.current?.getSelectedRows();
```

---

## 📣 Events

```
const handleEventUpdate = ({ type, value }) => {
  switch (type) {
    case "cell-edit": /* ... */ break;
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

## 🧑‍💻 Development

```
# Install deps
bun install
# Start dev server
bun run dev
# Build the library
bun run build
# Run tests
bun test
# Lint/fix
bun run lint
bun run format
# Typecheck
bun run typecheck
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/new-feature`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push to GitHub
5. Open a Pull Request

---

## 📝 License

MIT License – see the [LICENSE](LICENSE) file for details.

---

## 📚 Links

- [GitHub](https://github.com/Aravinthan-J/react_table)
- [TanStack Table Docs](https://tanstack.com/table/v8)
- [Radix UI Docs](https://www.radix-ui.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---

&copy; 2025 Aravinthan

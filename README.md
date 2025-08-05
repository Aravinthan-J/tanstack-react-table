# React Table Component

This is a powerful, extensible, and production-ready table component built with React and `@tanstack/react-table`.

## Features

-   **Virtualization:** Efficiently handles large datasets with row virtualization.
-   **Column Management:** Resizing, reordering, pinning, and hiding columns.
-   **Row Selection:** Single and multi-row selection.
-   **Expandable Rows:** Support for nested sub-rows and accordion-style expansion.
-   **Row Grouping:** Group rows based on specified columns.
-   **Customizable Cells:** Inject custom renderers for different data types.
-   **Theming:** TailwindCSS-first styling with support for custom themes and class overrides.
-   **Extensible API:** Exposes hooks and allows plugin-style extensions for features like pagination, toolbar, and export buttons.

## Installation

```bash
bun install react-table-component
```

## Usage

```tsx
import React from 'react';
import { Table } from 'react-table-component';

interface User {
  id: string;
  name: string;
  email: string;
}

const columns = [
  {
    Id: 'name',
    Title: 'Name',
    Type: 'text',
  },
  {
    Id: 'email',
    Title: 'Email',
    Type: 'email',
  },
];

const datasource: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

const App = () => {
  return (
    <Table
      columns={columns}
      datasource={datasource}
      rowKey="id"
      showSerialNumber={true}
      showRowSelection={true}
      onEventUpdate={({ type, value }) => console.log(type, value)}
      onEndReached={() => console.log('End reached')}
      emptyState={<div>No data available</div>}
      isVirtual={false}
      tableHeight={500}
      selectedItems={[]}
      expandable={{
        type: "none",
        isExpandable: false,
      }}
      grouping={{
        enabled: false,
        groupBy: [],
      }}
    />
  );
};

export default App;
```

## API Reference

### `Table` Component Props

(Detailed props will be listed here)

### Hooks

-   `useTableContext`
-   `useVirtualizedTable`
-   `useGroupedRows`

### Utilities

-   `variantClass`

## Customization

### Slot-based Rendering

YouYou can override default rendering for various parts of the table using the `slots` prop:

```tsx
<Table
  // ... other props
  slots={{
    header: CustomHeaderComponent,
    body: CustomBodyComponent,
    row: CustomRowComponent,
    cell: CustomCellComponent,
    emptyState: CustomEmptyStateComponent,
  }}
/>
```

### Theming and Styling

The table uses TailwindCSS for styling. You can control its appearance using:

-   **Prop-level flags:** `striped`, `bordered`, `compact`, `hoverable`, `density`.
-   **`theme` prop:** Set to `'light'` or `'dark'` to apply base themes.
-   **`classNames` prop:** Provide custom class names for specific table elements:

    ```tsx
    <Table
      // ... other props
      classNames={{
        table: "my-custom-table-class",
        header: "my-custom-header-class",
        // ... etc.
      }}
    />
    ```

-   **CSS Variables:** Full theme overrides can be achieved by defining CSS variables.

## Development

To set up the development environment:

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    bun install
    ```
3.  Run the build:
    ```bash
    bun run build
    ```
4.  Run linting and formatting:
    ```bash
    bun run lint
    bun run format
    ```

## Contributing

(Contribution guidelines will go here)

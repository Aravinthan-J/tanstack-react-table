import { BasicTable } from "./table/examples/BasicTable.tsx";
import { EditableTable } from "./table/examples/EditableTable.tsx";
import { NestedRowsTable } from "./table/examples/NestedRowsTable.tsx";
import { VirtualizedTable } from "./table/examples/VirtualizedTable.tsx";
import { Table } from "./table/index.ts";
import {
  dummyColumn,
  dummyData,
  dummyLargeTheme,
  dummyUserTheme,
} from "./table/mock";

import "./index.css";

export function App() {
  return (
    <div className="flex flex-col gap-20 m-8 p-16 h-full">
      <h1>All Example Tables</h1>
      <section className="mb-8 h-400">
        <h2 className="text-primary-500">Default Table</h2>
        <Table
          datasource={dummyData}
          columns={dummyColumn}
          rowKey={"id"}
          selectedItems={[]}
          showSerialNumber={true}
          showRowSelection={true}
          emptyState={<div>No data</div>}
          onEndReached={() => {}}
          isVirtual={false}
          rowHeight={60}
          onEventUpdate={(args) => {
            console.log("Updated Data", args);
          }}
          theme={{
            prefix: {
              oldPrefix: "theme",
              newPrefix: "mock",
            },
            variables: dummyLargeTheme,
          }}
        />
      </section>
      <section className="mb-8 mt-10  h-200">
        <h2 className="text-primary-500">Basic Table</h2>
        <BasicTable />
      </section>

      <section className="mb-8 mt-10  h-240">
        <h2 className="text-primary-500">Nested Rows Table</h2>
        <NestedRowsTable />
      </section>

      <section className="mb-8 mt-10  h-800">
        <h2 className="text-primary-500">Virtualized Table</h2>
        <VirtualizedTable />
      </section>

      <section className="mb-8 mt-10  h-300">
        <h2 className="text-primary-500">Editable Table</h2>
        <EditableTable />
      </section>
    </div>
  );
}

export default App;

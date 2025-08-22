import { BasicTable } from "./table/examples/BasicTable.tsx";
import { EditableTable } from "./table/examples/EditableTable.tsx";
import { NestedRowsTable } from "./table/examples/NestedRowsTable.tsx";
import { VirtualizedTable } from "./table/examples/VirtualizedTable.tsx";
import { Table } from "./table/index.ts";
import { dummyColumn, dummyData, dummyLargeTheme } from "./table/mock";

import "./index.css";

export function App() {
  return (
    <div className="flex flex-col gap-20 m-8 p-16 h-full">
      <h1 className="text-black font-bold text-5xl">All Example Tables</h1>
      <section className="my-10 h-400 w-fit">
        <h2 className="text-primary-500 my-10 font-bold text-2xl">
          Default Table
        </h2>
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
      <section className="my-10 h-200 w-fit ">
        <h2 className="text-primary-500 my-10 font-bold text-2xl">
          Basic Table
        </h2>
        <BasicTable />
      </section>

      <section className="my-10 h-240 w-fit">
        <h2 className="text-primary-500 my-10 font-bold text-2xl">
          Nested Rows Table
        </h2>
        <NestedRowsTable />
      </section>

      <section className="my-10 h-800 w-fit">
        <h2 className="text-primary-500 my-10 font-bold text-2xl">
          Virtualized Table
        </h2>
        <VirtualizedTable />
      </section>

      <section className="my-10 h-300 w-fit">
        <h2 className="text-primary-500 my-10 font-bold text-2xl">
          Editable Table
        </h2>
        <EditableTable />
      </section>
    </div>
  );
}

export default App;

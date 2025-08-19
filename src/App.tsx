import { Table } from "./table/index.ts";
import { dummyColumn, dummyData } from "./table/mock";

export function App() {
  return (
    <>
      <h1 className="text-5xl font-bold my-4 leading-tight text-red-600 text-center">
        TanStack Table with Virtualization
      </h1>
      <Table
        datasource={dummyData}
        columns={dummyColumn}
        rowKey={"id"}
        onEventUpdate={(args) => {
          console.log("Updated Data", args);
        }}
      />
    </>
  );
}

export default App;

import { Table } from "./table/index.ts";
import { dummyColumn, dummyData } from "./table/mock";

export function App() {
  return (
    <div className="flex flex-col h-800 m-8 p-16">
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
      />
    </div>
  );
}

export default App;

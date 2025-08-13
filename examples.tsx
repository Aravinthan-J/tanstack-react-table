import React from "react";
import ReactDOM from "react-dom/client";
import {
  BasicTable,
  NestedRowsTable,
  VirtualizedTable,
  EditableTable,
} from "./components/examples";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <div style={{ padding: 20 }}>
        <h1>All Example Tables</h1>

        <section>
          <h2>Basic Table</h2>
          <BasicTable />
        </section>

        <section>
          <h2>Nested Rows Table</h2>
          <NestedRowsTable />
        </section>

        <section>
          <h2>Virtualized Table</h2>
          <VirtualizedTable />
        </section>

        <section>
          <h2>Editable Table</h2>
          <EditableTable />
        </section>
      </div>
    </React.StrictMode>
  );
}

import { Table } from "./Table";

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 relative z-10 font-sans bg-gray-100 text-gray-900 min-h-screen">
      <h1 className="text-5xl font-bold my-4 leading-tight text-red-500 text-center">
        TanStack Table with Virtualization
      </h1>
      <Table />
    </div>
  );
}

export default App;

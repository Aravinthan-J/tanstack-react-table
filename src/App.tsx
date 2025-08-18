
import { useTheme } from "./ThemeProvider";
import { Table } from './Table';

export function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto p-8 relative z-10 font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Toggle Theme
        </button>
      </div>
      <h1 className="text-5xl font-bold my-4 leading-tight text-red-500 text-center">
        TanStack Table with Virtualization
      </h1>
      <Table />
    </div>
  );
}

export default App;

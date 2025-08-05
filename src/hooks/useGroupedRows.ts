import { useTable } from "../components/tablecontext";

export const useGroupedRows = () => {
  const { table } = useTable();
  const groupedRows = table.getGroupedRowModel().rows;
  return { groupedRows };
};
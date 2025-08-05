import { tv } from "tailwind-variants";

export const tableVariants = tv({
  base: "grid border-collapse font-sans table-fixed tableContainer",
  variants: {
    striped: {
      true: "[&>tbody>tr:nth-child(odd)]:bg-gray-50",
    },
    bordered: {
      true: "border border-gray-200",
    },
    compact: {
      true: "text-sm",
    },
    hoverable: {
      true: "[&>tbody>tr:hover]:bg-gray-100",
    },
    density: {
      comfortable: "",
      compact: "",
      spacious: "",
    },
  },
});

export const tableContainerVariants = tv({
  base: "border border-gray-200 rounded-12 overflow-auto relative",
  variants: {
    bordered: {
      true: "border-0",
    },
  },
});

export const tableHeaderVariants = tv({
  base: "grid sticky top-0 z-[1] tableHeadContainer",
});

export const tableHeaderCellVariants = tv({
  base: "h-44 text-left flex items-center py-12 px-8 cursor-pointer bg-gray-25 border-b-1 border-gray-200 border-solid text-gray-900 hover:bg-gray-100 group tableHeadCell ellipsis",
  variants: {
    density: {
      comfortable: "py-12 px-8",
      compact: "py-8 px-6",
      spacious: "py-16 px-10",
    },
  },
});

export const tableBodyVariants = tv({
  base: "tableBody",
});

export const tableRowVariants = tv({
  base: "tableRow flex relative w-full cursor-pointer flex-nowrap bg-white hover:bg-gray-50 group/tablerow",
  variants: {
    striped: {
      true: "",
    },
    bordered: {
      true: "border-b-1 border-solid border-gray-200",
    },
    compact: {
      true: "",
    },
    hoverable: {
      true: "",
    },
    density: {
      comfortable: "",
      compact: "",
      spacious: "",
    },
  },
});

export const tableCellVariants = tv({
  base: "flex bg-inherit px-12 py-4 items-center relative border-b-1 border-solid border-gray-200 group/table_cell",
  variants: {
    bordered: {
      true: "border-r-1",
    },
    density: {
      comfortable: "px-12 py-4",
      compact: "px-8 py-2",
      spacious: "px-16 py-6",
    },
  },
});
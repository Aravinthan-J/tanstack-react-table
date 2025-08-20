import { tv } from "tailwind-variants";

export const InputVariants = tv({
  slots: {
    base: "p-8 border-1 border-solid border-transparent !bg-inherit group-hover/table_cell:border-gray-200 focus:border-primary-500 [&:not([data-disabled]):not([data-readonly]):hover]:border-primary-400",
  },
  variants: {
    isError: {
      true: {
        base: "focus:!border-error-500 focus-within:!border-error-500 focus:!focus-error focus-within:!focus-error group-hover/table_cell:!border-error-500 [&:not([data-disabled]):not([data-readonly]):hover]:!border-error-500",
      },
    },
    readOnly: {
      true: {
        base: "hover:!bg-gray-500 cursor-pointer border-solid border-transparent hover:border-transparent group-hover/table_cell:border-transparent group-hover/table_cell:!bg-gray-500",
      },
    },
  },
});

export const RatingVariants = tv({
  slots: {
    base: "p-8 rounded-8 border-1 border-solid border-transparent hover:border-primary-400 group-hover/table_cell:border-gray-200 focus:border-primary-500 focus-within:focus-active focus-within:border-primary-500 transition-shadow transition-border duration-200 ease-in-out",
  },
  variants: {
    isError: {
      true: {
        base: "focus-within:border-error-500 focus-within:focus-error hover:border-error-500 group-hover/table_cell:border-error-500",
      },
    },
    readOnly: {
      true: {
        base: "hover:!bg-gray-500 cursor-pointer border-solid border-transparent hover:border-transparent group-hover/table_cell:border-transparent group-hover/table_cell:!bg-gray-500",
      },
    },
  },
});

export const DateTimeBoxVariants = tv({
  slots: {
    base: "border-1 border-solid border-transparent min-w-[auto] group-data-[state=open]:focus-active group-data-[state=open]:border-primary-500 group-hover/table_cell:border-gray-200 [&:not([data-disabled]):not([data-readonly]):hover]:border-primary-400",
  },
  variants: {
    isError: {
      true: {
        base: "group-data-[state=open]:focus-error group-data-[state=open]:border-error-500 focus:border-error-500 focus-within:border-error-500 focus:focus-error focus-within:focus-error group-hover/table_cell:border-error-500 [&:not([data-disabled]):not([data-readonly]):hover]:border-error-500",
      },
    },
    readOnly: {
      true: {
        base: "hover:!bg-gray-500 cursor-pointer border-1 border-solid border-transparent hover:border-transparent group-hover/table_cell:border-transparent group-hover/table_cell:bg-gray-500 focus:!shadow-none",
      },
    },
  },
});

export const MultiLineVariants = tv({
  slots: {
    base: "m-4 p-4 resize-none p-8 border-1 border-solid border-transparent !bg-inherit group-hover/table_cell:border-gray-200 focus:border-primary-500 [&:not([data-disabled]):not([data-readonly]):hover]:border-primary-400",
  },
  variants: {
    isError: {
      true: {
        base: "focus:!border-error-500 focus-within:!border-error-500 focus:!focus-error focus-within:!focus-error group-hover/table_cell:!border-error-500 [&:not([data-disabled]):not([data-readonly]):hover]:!border-error-500",
      },
    },
    readOnly: {
      true: {
        base: "hover:!bg-gray-500 cursor-pointer border-solid border-transparent hover:border-transparent group-hover/table_cell:border-transparent group-hover/table_cell:!bg-gray-500",
      },
    },
  },
});

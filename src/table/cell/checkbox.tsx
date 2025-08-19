"use client";

import * as React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";

type CheckedState = boolean | "indeterminate";

export interface CheckboxProps {
  checked: CheckedState;
  onChange: (value: CheckedState) => void;
  disabled?: boolean;
  id?: string;
  label?: string;
  helperText?: string;
  className?: string;
}

export function CheckboxComponent({
  checked,
  onChange,
  disabled = false,
  id,
  label,
  helperText,
  className,
}: CheckboxProps) {
  const checkboxId = id || React.useId();

  return (
    <div className="flex gap-2">
      <Checkbox.Root
        id={checkboxId}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className={[
          "peer inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-4 border cursor-pointer",
          "border-gray-300 bg-white",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          "data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500",
          "data-[state=indeterminate]:border-primary-500 data-[state=indeterminate]:bg-primary-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:border-primary-500 focus-visible:ring-offset-50",
          className || "",
        ].join(" ")}
      >
        <Checkbox.Indicator className="text-white">
          {checked === "indeterminate" ? (
            <MinusIcon className="h-20 w-20" />
          ) : (
            <CheckIcon className="h-20 w-20 mt-2" />
          )}
        </Checkbox.Indicator>
      </Checkbox.Root>

      {(label || helperText) && (
        <div className="select-none">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-gray-900 peer-disabled:text-gray-400"
            >
              {label}
            </label>
          )}
          {helperText && (
            <p className="mt-0.5 text-xs text-gray-500">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
}

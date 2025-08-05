import { type VariantProps } from "tailwind-variants";

export function variantClass<T extends (...args: any[]) => string>(variantFn: T, props: VariantProps<T>) {
  return variantFn(props);
}
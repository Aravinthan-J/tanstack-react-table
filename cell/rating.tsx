import { Rating } from "@/components/rating/rating.tsx";
import { RatingVariants } from "../variant.ts";

export function RatingCell({
  value,
  onChange,
  onDone: onBlur,
  readOnly,
  isError
}: {
  value: number;
  onChange: (value: number | undefined) => void;
  onDone: () => void;
  readOnly: boolean;
  isError: boolean;
}) {
  const { base } = RatingVariants({
    isError,
    readOnly
  });
  return (
    <div className={base()}>
      <Rating
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readonly={readOnly}
      />
    </div>
  );
}

import React, { useState, useCallback } from "react";
import type { CellProps } from "../Table.types";

/**
 * Editable rating cell with star display
 */
export function EditableRatingCell({
  value = 0,
  onCommit,
  onChange,
  readOnly = false,
  isError = false,
  ariaLabel,
}: CellProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const maxRating = 5;
  const currentRating = Number(value) || 0;

  const handleRatingClick = useCallback(
    (rating: number) => {
      if (!readOnly) {
        onChange(rating);
        onCommit(rating);
      }
    },
    [readOnly, onChange, onCommit]
  );

  const handleMouseEnter = useCallback(
    (rating: number) => {
      if (!readOnly) {
        setHoverRating(rating);
      }
    },
    [readOnly]
  );

  const handleMouseLeave = useCallback(() => {
    if (!readOnly) {
      setHoverRating(0);
    }
  }, [readOnly]);

  const displayRating = hoverRating || currentRating;

  return (
    <div
      style={{
        width: "100%",
        padding: "4px 8px",
        minHeight: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2px",
        border: `1px solid ${
          isError ? "hsl(var(--destructive))" : "transparent"
        }`,
        borderRadius: "4px",
      }}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel || `Rating: ${currentRating} out of ${maxRating}`}
      className="group-hover/table_cell:border-gray-200"
    >
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= displayRating;
        const isHovered = starValue <= hoverRating;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleRatingClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            disabled={readOnly}
            style={{
              background: "none",
              border: "none",
              cursor: readOnly ? "default" : "pointer",
              padding: "2px",
              fontSize: "16px",
              color: isFilled
                ? isHovered
                  ? "hsl(var(--primary))"
                  : "hsl(var(--yellow-500))"
                : "hsl(var(--muted-foreground))",
              transition: "color 0.2s",
              lineHeight: 1,
            }}
            aria-label={`Rate ${starValue} star${starValue !== 1 ? "s" : ""}`}
            className="hover:scale-110 focus:outline-none focus:scale-110"
          >
            {isFilled ? "★" : "☆"}
          </button>
        );
      })}

      {currentRating > 0 && (
        <span
          style={{
            marginLeft: "8px",
            fontSize: "12px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          {currentRating}/{maxRating}
        </span>
      )}
    </div>
  );
}

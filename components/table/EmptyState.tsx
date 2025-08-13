import React from "react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <svg
        className="w-16 h-16 text-muted-foreground/50 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 className="text-lg font-medium text-foreground mb-2">
        No Data Available
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        There are no items to display at this time. Add some data to get
        started.
      </p>
    </div>
  );
}

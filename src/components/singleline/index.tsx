import React from 'react';

export const SingleLine = ({
  value,
  onChange,
  onBlur,
  className,
  isError,
  readOnly,
  autoFocus,
}: any) => {
  return (
    <div className="single-line-wrapper">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        readOnly={readOnly}
        autoFocus={autoFocus}
      />
    </div>
  );
};
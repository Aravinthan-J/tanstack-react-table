import React from 'react';

export const NumberInput = ({ value, onChange, onBlur, className, readOnly, isError, autoFocus }: any) => {
  return (
    <div className="number-input-wrapper">
      <input
        type="number"
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
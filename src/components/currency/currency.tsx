import React from 'react';

export const Currency = ({ value, onBlur, onChange, className, isError, readOnly, autoFocus, selectedCurrency, onCurrencyChange }: any) => {
  return (
    <input
      type="text"
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      className={className}
      readOnly={readOnly}
      autoFocus={autoFocus}
    />
  );
};
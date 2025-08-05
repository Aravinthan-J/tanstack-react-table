import React from 'react';

export const Rating = ({ value, onChange, onBlur, readonly }: any) => {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      readOnly={readonly}
      min="0"
      max="5"
    />
  );
};
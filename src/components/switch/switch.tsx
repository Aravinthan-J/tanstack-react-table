import React from 'react';

export const Switch = ({ checked, onChange, disabled }: any) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      role="switch"
    />
  );
};
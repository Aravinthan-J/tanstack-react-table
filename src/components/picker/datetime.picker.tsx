import React from 'react';

export const DateTimePicker = ({ value, onChange, showFooter, readonly, isError, trigger, open, onClose, includeTime, showQuickDates }: any) => {
  return (
    <input
      type="datetime-local"
      value={value}
      onChange={onChange}
      readOnly={readonly}
    />
  );
};
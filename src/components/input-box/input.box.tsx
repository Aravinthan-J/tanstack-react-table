import React from 'react';

export const InputBox = ({ children, isReadOnly, disabled, isError, className, containerClassName, asChild }: any) => {
  return <div className="input-box">{children}</div>;
};
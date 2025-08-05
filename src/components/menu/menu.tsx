import React from 'react';

export const Menu = ({ children, size, onOpenChange, open }: any) => {
  return <div className="menu">{children}</div>;
};

export const MenuContent = ({ children, align, 'data-testid': dataTestId, className, container }: any) => {
  return <div className="menu-content">{children}</div>;
};

export const MenuTrigger = ({ children }: any) => {
  return <div className="menu-trigger">{children}</div>;
};

export const MenuItem = ({ children, onClick }: any) => {
  return <div className="menu-item" onClick={onClick}>{children}</div>;
};
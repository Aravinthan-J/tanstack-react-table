import * as Select from '@radix-ui/react-select';
import React, { useState, useCallback, useEffect } from 'react';
import type { CellProps } from '../Table.types';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectCellProps extends CellProps {
  options?: SelectOption[];
}

/**
 * Editable select cell using Radix UI Select
 */
export function EditableSelectCell({
  value = '',
  options = [],
  onCommit,
  onCancel,
  onChange,
  readOnly = false,
  isError = false,
  errors = [],
  ariaLabel
}: SelectCellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(String(value));

  useEffect(() => {
    setSelectedValue(String(value));
  }, [value]);

  const handleValueChange = useCallback((newValue: string) => {
    setSelectedValue(newValue);
    onChange(newValue);
    onCommit(newValue);
    setIsOpen(false);
  }, [onChange, onCommit]);

  const selectedOption = options.find(option => option.value === selectedValue);
  const displayValue = selectedOption?.label || selectedValue || '';

  if (readOnly) {
    return (
      <div
        style={{
          width: '100%',
          padding: '4px 8px',
          minHeight: '20px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        aria-label={ariaLabel}
      >
        {displayValue || <span style={{ color: 'hsl(var(--muted-foreground))' }}>No value</span>}
      </div>
    );
  }

  return (
    <Select.Root 
      value={selectedValue} 
      onValueChange={handleValueChange}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Select.Trigger
        style={{
          width: '100%',
          padding: '4px 8px',
          border: `1px solid ${isError ? 'hsl(var(--destructive))' : 'transparent'}`,
          borderRadius: '4px',
          backgroundColor: 'transparent',
          color: 'hsl(var(--foreground))',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '20px'
        }}
        className="hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 group-hover/table_cell:border-gray-200"
        aria-label={ariaLabel}
        aria-invalid={isError}
      >
        <Select.Value placeholder="Select option...">
          {displayValue}
        </Select.Value>
        <Select.Icon style={{ marginLeft: '4px' }}>
          ▼
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          style={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            minWidth: '160px',
            maxHeight: '200px',
            overflow: 'hidden'
          }}
          position="popper"
          sideOffset={4}
        >
          <Select.ScrollUpButton
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '25px',
              backgroundColor: 'hsl(var(--background))',
              cursor: 'default'
            }}
          >
            ▲
          </Select.ScrollUpButton>

          <Select.Viewport style={{ padding: '4px' }}>
            {options.length === 0 ? (
              <div
                style={{
                  padding: '8px 12px',
                  fontSize: '14px',
                  color: 'hsl(var(--muted-foreground))',
                  textAlign: 'center'
                }}
              >
                No options available
              </div>
            ) : (
              options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    cursor: option.disabled ? 'not-allowed' : 'pointer',
                    borderRadius: '4px',
                    margin: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    userSelect: 'none',
                    color: option.disabled ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))'
                  }}
                  className="focus:bg-accent focus:outline-none data-[highlighted]:bg-accent"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator
                    style={{
                      position: 'absolute',
                      right: '8px',
                      width: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ✓
                  </Select.ItemIndicator>
                </Select.Item>
              ))
            )}
          </Select.Viewport>

          <Select.ScrollDownButton
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '25px',
              backgroundColor: 'hsl(var(--background))',
              cursor: 'default'
            }}
          >
            ▼
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
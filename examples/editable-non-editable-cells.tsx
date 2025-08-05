import React, { useState } from 'react';
import { Table } from '../src';

interface Item {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  status: 'Active' | 'Inactive';
}

const EditableTextCell = ({ value, onDone }: any) => {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <input
      type="text"
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={() => onDone({ changedValue: currentValue })}
      style={{ width: '100%' }}
    />
  );
};

const columns = [
  {
    Id: 'name',
    Title: 'Item Name',
    Type: 'text',
    Render: EditableTextCell, // Editable
  },
  {
    Id: 'description',
    Title: 'Description',
    Type: 'text',
    // No Render prop, so it uses default non-editable behavior
  },
  {
    Id: 'quantity',
    Title: 'Quantity',
    Type: 'number',
    Render: ({ value, onDone }: any) => {
      const [currentValue, setCurrentValue] = useState(value);
      return (
        <input
          type="number"
          value={currentValue}
          onChange={(e) => setCurrentValue(Number(e.target.value))}
          onBlur={() => onDone({ changedValue: currentValue })}
          style={{ width: '100%' }}
        />
      );
    }, // Editable
  },
  {
    Id: 'price',
    Title: 'Price',
    Type: 'currency',
    meta: { isReadOnly: true }, // Explicitly non-editable via meta
  },
  {
    Id: 'status',
    Title: 'Status',
    Type: 'text',
    meta: { isReadOnly: true }, // Explicitly non-editable via meta
  },
];

const initialData: Item[] = [
  { id: 'i1', name: 'Laptop', description: 'Powerful machine', quantity: 5, price: 1200, status: 'Active' },
  { id: 'i2', name: 'Mouse', description: 'Wireless mouse', quantity: 20, price: 25, status: 'Active' },
  { id: 'i3', name: 'Keyboard', description: 'Mechanical keyboard', quantity: 10, price: 75, status: 'Inactive' },
];

const EditableNonEditableCellsTable = () => {
  const [data, setData] = useState<Item[]>(initialData);

  const handleEventUpdate = ({ type, value }: { type: string; value: any }) => {
    if (type === 'edit') {
      const { rowId, changedValue, columnId } = value;
      setData((prevData) =>
        prevData.map((row) =>
          row.id === rowId ? { ...row, [columnId]: changedValue[columnId] } : row
        )
      );
      console.log('Cell Edited:', { rowId, changedValue, columnId });
    }
    console.log(type, value);
  };

  return (
    <Table
      columns={columns}
      datasource={data}
      rowKey="id"
      showSerialNumber={true}
      showRowSelection={true}
      onEventUpdate={handleEventUpdate}
      onEndReached={() => console.log('End reached')}
      emptyState={<div>No data available</div>}
      isVirtual={false}
      tableHeight={500}
      selectedItems={[]}
      expandable={{
        type: "none",
        isExpandable: false,
      }}
      grouping={{
        enabled: false,
        groupBy: [],
      }}
      rowHeight={40}
      options={{}}
    />
  );
};

export default EditableNonEditableCellsTable;
import React from 'react';
import { Table } from '../src';

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  rating: number;
}

const CustomPriceCell = ({ row, onDone }: any) => {
  const price = row.original.price;
  return (
    <div style={{ color: price > 100 ? 'green' : 'red' }}>
      ${price.toFixed(2)}
    </div>
  );
};

const CustomStockCell = ({ row, onDone }: any) => {
  const inStock = row.original.inStock;
  return (
    <span style={{ color: inStock ? 'blue' : 'orange' }}>
      {inStock ? 'Available' : 'Out of Stock'}
    </span>
  );
};

const columns = [
  {
    Id: 'name',
    Title: 'Product Name',
    Type: 'text',
  },
  {
    Id: 'price',
    Title: 'Price',
    Type: 'currency',
    Render: CustomPriceCell,
  },
  {
    Id: 'inStock',
    Title: 'Availability',
    Type: 'boolean',
    Render: CustomStockCell,
  },
  {
    Id: 'rating',
    Title: 'Rating',
    Type: 'rating',
  },
];

const datasource: Product[] = [
  { id: 'p1', name: 'Laptop', price: 1200.50, inStock: true, rating: 4 },
  { id: 'p2', name: 'Mouse', price: 25.00, inStock: false, rating: 2 },
  { id: 'p3', name: 'Keyboard', price: 75.99, inStock: true, rating: 5 },
];

const CustomCellsTable = () => {
  return (
    <Table
      columns={columns}
      datasource={datasource}
      rowKey="id"
      showSerialNumber={true}
      showRowSelection={true}
      onEventUpdate={({ type, value }) => console.log(type, value)}
      onEndReached={() => console.log('End reached')}
      emptyState={<div>No data available</div>}
      isVirtual={false}
      tableHeight={500}
      rowHeight={50}
      options={{}}
      selectedItems={[]}
      expandable={{
        type: "none",
        isExpandable: false,
      }}
      grouping={{
        enabled: false,
        groupBy: [],
      }}
    />
  );
};

export default CustomCellsTable;
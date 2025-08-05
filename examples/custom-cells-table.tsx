import React from 'react';
import { Table } from '../src';

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  rating: number;
  lastUpdated: string;
  description: string;
}

const CustomPriceCell = ({ row }: any) => {
  const price = row.original.price;
  return (
    <div style={{ color: price > 100 ? 'green' : 'red' }}>
      ${price.toFixed(2)}
    </div>
  );
};

const CustomStockCell = ({ row }: any) => {
  const inStock = row.original.inStock;
  return (
    <span style={{ color: inStock ? 'blue' : 'orange' }}>
      {inStock ? 'Available' : 'Out of Stock'}
    </span>
  );
};

const CustomDescriptionCell = ({ row }: any) => {
  const description = row.original.description;
  return (
    <div style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {description}
    </div>
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
  {
    Id: 'lastUpdated',
    Title: 'Last Updated',
    Type: 'date',
  },
  {
    Id: 'description',
    Title: 'Description',
    Type: 'textarea',
    Render: CustomDescriptionCell,
  },
];

const datasource: Product[] = [
  { id: 'p1', name: 'Laptop', price: 1200.50, inStock: true, rating: 4, lastUpdated: '2023-01-01', description: 'High-performance laptop with a sleek design and powerful processor.' },
  { id: 'p2', name: 'Mouse', price: 25.00, inStock: false, rating: 2, lastUpdated: '2023-01-05', description: 'Ergonomic wireless mouse with customizable buttons.' },
  { id: 'p3', name: 'Keyboard', price: 75.99, inStock: true, rating: 5, lastUpdated: '2023-01-10', description: 'Mechanical gaming keyboard with RGB lighting and tactile switches.' },
  { id: 'p4', name: 'Monitor', price: 300.00, inStock: true, rating: 4, lastUpdated: '2023-01-15', description: '27-inch 4K UHD monitor with HDR support and fast refresh rate.' },
  { id: 'p5', name: 'Webcam', price: 50.00, inStock: true, rating: 3, lastUpdated: '2023-01-20', description: 'Full HD webcam with built-in microphone for video conferencing.' },
  { id: 'p6', name: 'Headphones', price: 150.00, inStock: false, rating: 4, lastUpdated: '2023-01-25', description: 'Noise-cancelling over-ear headphones with long battery life.' },
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
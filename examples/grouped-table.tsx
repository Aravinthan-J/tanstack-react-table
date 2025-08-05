import React from 'react';
import { Table } from '../src';

interface Order {
  orderId: string;
  customer: string;
  product: string;
  quantity: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  orderDate: string;
  region: string;
}

const columns = [
  {
    Id: 'orderId',
    Title: 'Order ID',
    Type: 'text',
  },
  {
    Id: 'customer',
    Title: 'Customer',
    Type: 'text',
  },
  {
    Id: 'product',
    Title: 'Product',
    Type: 'text',
  },
  {
    Id: 'quantity',
    Title: 'Quantity',
    Type: 'number',
  },
  {
    Id: 'status',
    Title: 'Status',
    Type: 'text',
  },
  {
    Id: 'orderDate',
    Title: 'Order Date',
    Type: 'date',
  },
  {
    Id: 'region',
    Title: 'Region',
    Type: 'text',
  },
];

const datasource: Order[] = [
  { orderId: 'A001', customer: 'Alice', product: 'Laptop', quantity: 1, status: 'Delivered', orderDate: '2023-01-15', region: 'North' },
  { orderId: 'A002', customer: 'Bob', product: 'Mouse', quantity: 2, status: 'Shipped', orderDate: '2023-01-16', region: 'South' },
  { orderId: 'A003', customer: 'Alice', product: 'Keyboard', quantity: 1, status: 'Pending', orderDate: '2023-01-15', region: 'North' },
  { orderId: 'A004', customer: 'Charlie', product: 'Monitor', quantity: 1, status: 'Delivered', orderDate: '2023-01-17', region: 'East' },
  { orderId: 'A005', customer: 'Bob', product: 'Webcam', quantity: 1, status: 'Pending', orderDate: '2023-01-16', region: 'South' },
  { orderId: 'A006', customer: 'Alice', product: 'Laptop Bag', quantity: 1, status: 'Shipped', orderDate: '2023-01-18', region: 'North' },
  { orderId: 'A007', customer: 'Charlie', product: 'Headphones', quantity: 2, status: 'Shipped', orderDate: '2023-01-17', region: 'East' },
  { orderId: 'A008', customer: 'David', product: 'Desk Chair', quantity: 1, status: 'Delivered', orderDate: '2023-01-19', region: 'West' },
  { orderId: 'A009', customer: 'Alice', product: 'External SSD', quantity: 1, status: 'Pending', orderDate: '2023-01-18', region: 'North' },
  { orderId: 'A010', customer: 'David', product: 'Monitor Arm', quantity: 1, status: 'Shipped', orderDate: '2023-01-19', region: 'West' },
];

const GroupedTable = () => {
  return (
    <Table
      columns={columns}
      datasource={datasource}
      rowKey="orderId"
      showSerialNumber={true}
      showRowSelection={true}
      onEventUpdate={({ type, value }) => console.log(type, value)}
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
        enabled: true,
        groupBy: ['customer', 'status'], // Group by customer and then status
      }}
      rowHeight={40}
      options={{}}
    />
  );
};

export default GroupedTable;
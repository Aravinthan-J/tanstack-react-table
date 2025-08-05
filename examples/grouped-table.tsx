import React from 'react';
import { Table } from '../src';

interface Order {
  orderId: string;
  customer: string;
  product: string;
  quantity: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
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
];

const datasource: Order[] = [
  { orderId: 'A001', customer: 'Alice', product: 'Laptop', quantity: 1, status: 'Delivered' },
  { orderId: 'A002', customer: 'Bob', product: 'Mouse', quantity: 2, status: 'Shipped' },
  { orderId: 'A003', customer: 'Alice', product: 'Keyboard', quantity: 1, status: 'Pending' },
  { orderId: 'A004', customer: 'Charlie', product: 'Monitor', quantity: 1, status: 'Delivered' },
  { orderId: 'A005', customer: 'Bob', product: 'Webcam', quantity: 1, status: 'Pending' },
  { orderId: 'A006', customer: 'Alice', product: 'Laptop Bag', quantity: 1, status: 'Shipped' },
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
        groupBy: ['customer'], // Group by customer
      }}
      rowHeight={40}
      options={{}}
    />
  );
};

export default GroupedTable;
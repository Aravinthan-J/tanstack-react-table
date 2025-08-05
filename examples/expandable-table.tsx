import React from 'react';
import { Table } from '../src';

// Define the expandable type constant locally
const EXPANDABLE_TYPES = {
  ROW: 'ROW',
  // Add other types if needed
};

interface UserWithOrders {
  userId: string;
  name: string;
  email: string;
  orders?: { orderId: string; item: string; amount: number }[];
}

const columns = [
  {
    Id: 'name',
    Title: 'User Name',
    Type: 'text',
  },
  {
    Id: 'email',
    Title: 'Email',
    Type: 'email',
  },
];

const datasource: UserWithOrders[] = [
  {
    userId: 'u1',
    name: 'Alice',
    email: 'alice@example.com',
    orders: [
      { orderId: 'o1', item: 'Laptop', amount: 1200 },
      { orderId: 'o2', item: 'Mouse', amount: 25 },
    ],
  },
  {
    userId: 'u2',
    name: 'Bob',
    email: 'bob@example.com',
    orders: [
      { orderId: 'o3', item: 'Keyboard', amount: 75 },
    ],
  },
  {
    userId: 'u3',
    name: 'Charlie',
    email: 'charlie@example.com',
  },
];

const ExpandableTable = () => {
  return (
    <Table
      columns={columns}
      datasource={datasource}
      rowKey="userId"
      showSerialNumber={true}
      showRowSelection={true}
      onEventUpdate={({ type, value }) => console.log(type, value)}
      onEndReached={() => console.log('End reached')}
      emptyState={<div>No data available</div>}
      isVirtual={false}
      tableHeight={500}
      selectedItems={[]}
      rowHeight={50}
      options={{}}
      expandable={{
        type: EXPANDABLE_TYPES.ROW,
        isExpandable: true,
        expandedRowRender: (row) => {
          const original = row.original as UserWithOrders;
          return (
            <div style={{ padding: '10px', background: '#f0f0f0' }}>
              <h4>Orders for {original.name}</h4>
              {original.orders && original.orders.length > 0 ? (
                <ul>
                  {original.orders.map((order) => (
                    <li key={order.orderId}>
                      {order.item} - ${order.amount}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found.</p>
              )}
            </div>
          );
        },
      }}
      grouping={{
        enabled: false,
        groupBy: [],
      }}
    />
  );
};

export default ExpandableTable;
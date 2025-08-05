import React from "react";
import { Table } from "../src";

// Define the expandable type constant locally
const EXPANDABLE_TYPES = {
  ROW: "ROW",
  // Add other types if needed
};

interface UserWithOrders {
  userId: string;
  name: string;
  email: string;
  department: string;
  hireDate: string;
  orders?: {
    orderId: string;
    item: string;
    amount: number;
    orderDate: string;
  }[];
}

const columns = [
  {
    Id: "name",
    Title: "User Name",
    Type: "text",
  },
  {
    Id: "email",
    Title: "Email",
    Type: "email",
  },
  {
    Id: "department",
    Title: "Department",
    Type: "text",
  },
  {
    Id: "hireDate",
    Title: "Hire Date",
    Type: "date",
  },
];

const datasource: UserWithOrders[] = [
  {
    userId: "u1",
    name: "Alice",
    email: "alice@example.com",
    department: "Sales",
    hireDate: "2020-03-10",
    orders: [
      { orderId: "o1", item: "Laptop", amount: 1200, orderDate: "2023-01-15" },
      { orderId: "o2", item: "Mouse", amount: 25, orderDate: "2023-01-16" },
    ],
  },
  {
    userId: "u2",
    name: "Bob",
    email: "bob@example.com",
    department: "Marketing",
    hireDate: "2019-07-22",
    orders: [
      { orderId: "o3", item: "Keyboard", amount: 75, orderDate: "2023-02-01" },
      { orderId: "o4", item: "Monitor", amount: 300, orderDate: "2023-02-05" },
    ],
  },
  {
    userId: "u3",
    name: "Charlie",
    email: "charlie@example.com",
    department: "Engineering",
    hireDate: "2021-01-01",
    orders: [
      { orderId: "o5", item: "Webcam", amount: 50, orderDate: "2023-03-10" },
    ],
  },
  {
    userId: "u4",
    name: "David",
    email: "david@example.com",
    department: "Sales",
    hireDate: "2018-11-01",
    orders: [
      {
        orderId: "o6",
        item: "Projector",
        amount: 700,
        orderDate: "2023-04-01",
      },
      { orderId: "o7", item: "Screen", amount: 150, orderDate: "2023-04-02" },
      { orderId: "o8", item: "Speakers", amount: 100, orderDate: "2023-04-03" },
    ],
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
      onEndReached={() => console.log("End reached")}
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
          const user = row.original as UserWithOrders;
          return (
            <div style={{ padding: "10px", background: "#f0f0f0" }}>
              <h4>Orders for {user.name}</h4>
              {user.orders && user.orders.length > 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Order ID
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Item
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Amount
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Order Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.orders.map((order) => (
                      <tr key={order.orderId}>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {order.orderId}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {order.item}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          ${order.amount}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {order.orderDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

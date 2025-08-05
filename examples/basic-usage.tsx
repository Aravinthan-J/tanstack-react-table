import React from 'react';
import { Table } from '../src';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  city: string;
  occupation: string;
}

const columns = [
  {
    Id: 'name',
    Title: 'Name',
    Type: 'text',
  },
  {
    Id: 'email',
    Title: 'Email',
    Type: 'email',
  },
  {
    Id: 'age',
    Title: 'Age',
    Type: 'number',
  },
  {
    Id: 'city',
    Title: 'City',
    Type: 'text',
  },
  {
    Id: 'occupation',
    Title: 'Occupation',
    Type: 'text',
  },
];

const datasource: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, city: 'New York', occupation: 'Software Engineer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 24, city: 'Los Angeles', occupation: 'UX Designer' },
  { id: '3', name: 'Peter Jones', email: 'peter@example.com', age: 45, city: 'Chicago', occupation: 'Project Manager' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', age: 38, city: 'Houston', occupation: 'Data Scientist' },
  { id: '5', name: 'Bob White', email: 'bob@example.com', age: 29, city: 'Phoenix', occupation: 'Marketing Specialist' },
  { id: '6', name: 'Charlie Green', email: 'charlie@example.com', age: 52, city: 'Philadelphia', occupation: 'CEO' },
  { id: '7', name: 'Diana Prince', email: 'diana@example.com', age: 33, city: 'San Antonio', occupation: 'Product Manager' },
  { id: '8', name: 'Eve Adams', email: 'eve@example.com', age: 27, city: 'San Diego', occupation: 'Graphic Designer' },
  { id: '9', name: 'Frank Black', email: 'frank@example.com', age: 41, city: 'Dallas', occupation: 'DevOps Engineer' },
  { id: '10', name: 'Grace Hall', email: 'grace@example.com', age: 36, city: 'San Jose', occupation: 'QA Engineer' },
];

const BasicTable = () => {
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

export default BasicTable;
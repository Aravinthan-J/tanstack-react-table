import React from 'react';
import { Table } from '../src';

interface User {
  id: string;
  name: string;
  email: string;
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
];

const datasource: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
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
import React from 'react';
import { Table } from '../src';

// Define the expandable type constant if not exported from '../src'
const EXPANDABLE_ROW_TYPE = "ROW";
interface ComplexData {
  id: string;
  category: string;
  itemName: string;
  value: number;
  isAvailable: boolean;
  notes?: string;
  subItems?: { subId: string; subName: string; subValue: number; status: 'Completed' | 'Pending' }[];
  lastReviewDate: string;
  reviewer: string;
}

const CustomValueCell = ({ row }: any) => {
  const value = row.original.value;
  return (
    <span style={{ fontWeight: 'bold', color: value > 500 ? 'purple' : 'gray' }}>
      ${value.toFixed(2)}
    </span>
  );
};

const CustomNotesCell = ({ row }: any) => {
  const notes = row.original.notes;
  return (
    <div style={{ fontStyle: 'italic', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {notes || 'N/A'}
    </div>
  );
};

const columns = [
  {
    Id: 'category',
    Title: 'Category',
    Type: 'text',
  },
  {
    Id: 'itemName',
    Title: 'Item Name',
    Type: 'text',
  },
  {
    Id: 'value',
    Title: 'Value',
    Type: 'currency',
    Render: CustomValueCell,
  },
  {
    Id: 'isAvailable',
    Title: 'Available',
    Type: 'boolean',
  },
  {
    Id: 'notes',
    Title: 'Notes',
    Type: 'textarea',
    Render: CustomNotesCell,
  },
  {
    Id: 'lastReviewDate',
    Title: 'Last Review',
    Type: 'date',
  },
  {
    Id: 'reviewer',
    Title: 'Reviewer',
    Type: 'text',
  },
];

const datasource: ComplexData[] = [
  {
    id: 'c1', category: 'Electronics', itemName: 'Smartphone', value: 899.99, isAvailable: true, notes: 'Latest model with advanced features.', lastReviewDate: '2023-05-01', reviewer: 'John D.',
    subItems: [{ subId: 's1', subName: 'Charger', subValue: 20, status: 'Completed' }]
  },
  {
    id: 'c2', category: 'Books', itemName: 'Sci-Fi Novel', value: 15.50, isAvailable: true, notes: 'Bestselling author.', lastReviewDate: '2023-04-15', reviewer: 'Jane S.',
  },
  {
    id: 'c3', category: 'Electronics', itemName: 'Smartwatch', value: 299.00, isAvailable: false, notes: 'Out of stock until next month.', lastReviewDate: '2023-05-10', reviewer: 'Peter J.',
    subItems: [{ subId: 's2', subName: 'Extra Band', subValue: 15, status: 'Pending' }]
  },
  {
    id: 'c4', category: 'Home Goods', itemName: 'Coffee Maker', value: 120.00, isAvailable: true, notes: 'Programmable with grinder.', lastReviewDate: '2023-03-20', reviewer: 'Alice B.',
  },
  {
    id: 'c5', category: 'Books', itemName: 'Fantasy Series', value: 45.00, isAvailable: true, notes: 'Complete 5-book series.', lastReviewDate: '2023-04-25', reviewer: 'Jane S.',
  },
  {
    id: 'c6', category: 'Electronics', itemName: 'Bluetooth Speaker', value: 75.00, isAvailable: true, notes: 'Portable with great sound.', lastReviewDate: '2023-05-05', reviewer: 'John D.',
  },
];

const FullFeaturedTable = () => {
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
      tableHeight={600}
      selectedItems={[]}
      expandable={{
        type: EXPANDABLE_ROW_TYPE,
        isExpandable: true,
        expandedRowRender: (row) => {
          const original = row.original as ComplexData;
          return (
            <div style={{ padding: '10px', background: '#e0e0e0' }}>
              <h5>Sub-items for {original.itemName}</h5>
              {original.subItems && original.subItems.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Sub-item ID</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Sub-item Name</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Sub-item Value</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {original.subItems?.map((sub) => (
                      <tr key={sub.subId}>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{sub.subId}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{sub.subName}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>${sub.subValue}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{sub.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No sub-items.</p>
              )}
            </div>
          );
        },
      }}
      grouping={{
        enabled: true,
        groupBy: ['category', 'reviewer'],
      }}
      striped={true}
      bordered={true}
      compact={false}
      hoverable={true}
      density="comfortable"
      rowHeight={48}
      options={{}}
    />
  );
};

export default FullFeaturedTable;
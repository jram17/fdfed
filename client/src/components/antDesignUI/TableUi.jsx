import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';

const App = ({ data }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: data.map((ele) => ({
          text: ele.name,
          value: ele.name,
        })),
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        filters: data.map((ele) => ({
          text: ele.state,
          value: ele.state,
        })),
        filteredValue: filteredInfo.state || null,
        onFilter: (value, record) => record.state.includes(value),
        sorter: (a, b) => a.state.localeCompare(b.state), // Corrected sorting for strings
        sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: 'Registration Number',
        dataIndex: 'registration_number',
        key: 'registration_number',
        filters: data.map((ele) => ({
          text: ele.registration_number,
          value: ele.registration_number,
        })),
        filteredValue: filteredInfo.registration_number || null,
        onFilter: (value, record) => record.registration_number.includes(value),
        sorter: (a, b) =>
          a.registration_number.length - b.registration_number.length,
        sortOrder:
          sortedInfo.columnKey === 'registration_number'
            ? sortedInfo.order
            : null,
        ellipsis: true,
      },
      {
        title: 'Subscription',
        dataIndex: 'subscription',
        key: 'subscription',
        sorter: (a, b) => a.subscription.length - b.subscription.length,
        filters: [
          {
            text: 'Basic',
            value: 'Basic',
          },
          {
            text: 'Premium',
            value: 'Premium',
          },
        ],
        filteredValue: filteredInfo.subscription || null,
        onFilter: (value, record) => record.subscription.includes(value),
        sortOrder:
          sortedInfo.columnKey === 'subscription' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: 'Started At',
        dataIndex: 'started_at',
        key: 'started_at',
        filters: data.map((ele) => ({
          text: ele.started_at,
          value: ele.started_at,
        })),
        filteredValue: filteredInfo.started_at || null,
        onFilter: (value, record) => record.started_at.includes(value),
        sorter: (a, b) => new Date(a.started_at) - new Date(b.started_at),
        sortOrder:
          sortedInfo.columnKey === 'started_at' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: 'Pincode',
        dataIndex: 'address',
        key: 'address',
        filters: data.map((ele) => ({
          text: ele.address,
          value: ele.address,
        })),
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
        ellipsis: true,
      },
    ]);
  }, [data, filteredInfo, sortedInfo]);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => setFilteredInfo({});
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default App;

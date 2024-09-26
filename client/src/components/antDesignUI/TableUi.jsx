import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';

const DataTable = ({ data }) => {
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

const UserApartments_table = ({ data }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const columns = [
    {
      title: 'Apartment',
      dataIndex: 'apt_name',
      key: 'apt_name',
    },

    {
      title: 'OwnerName',
      dataIndex: 'owner_name',
      key: 'owner_name',
    },
    {
      title: 'Apartment UserName',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Flat Id',
      dataIndex: 'flat_id',
      key: 'flat_id',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      render: (_, { designation }) => {
        let color = designation === 'Owner' ? 'red' : 'green';
        return (
          <Tag color={color} key={designation}>
            {designation.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  // Function to handle expand/collapse state
  const handleExpand = (expanded, record) => {
    const key = record.flat_id; // Use a unique identifier, such as flat_id
    setExpandedRowKeys(expanded ? [key] : []); // Allow only one row to be expanded at a time
  };

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.address}
          </p>
        ),
        rowExpandable: (record) => record.owner_name !== 'Not Expandable',
        expandedRowKeys: expandedRowKeys, // Control expanded row state
        onExpand: handleExpand, // Handle expand/collapse action
      }}
      dataSource={data}
      rowKey="flat_id" // Use a unique identifier for each row
    />
  );
};
const Owners_table = ({ data }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const columns = [
    {
      title: 'Apartment',
      dataIndex: 'apt_name',
      key: 'apt_name',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Registration Number',
      dataIndex: 'registration_num',
      key: 'registration_num',
    },
    {
      title: 'Emergency Email',
      dataIndex: 'emergency_email',
      key: 'emergency_email',
    },
    {
      title: 'No of Residents',
      dataIndex: 'no_of_residents',
      key: 'no_of_residents',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Pincode',
      dataIndex: 'pincode',
      key: 'pincode',
    },
  ];

  // Function to handle expand/collapse state
  const handleExpand = (expanded, record) => {
    const key = record.flat_id; // Use flat_id as it is more likely to be unique
    setExpandedRowKeys(expanded ? [key] : []); // Allow only one row to be expanded at a time
  };

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>
            {record.address || 'No address available'}
          </p>
        ),
        rowExpandable: (record) =>
          record.address && record.address !== 'Not Expandable',
        expandedRowKeys: expandedRowKeys, // Control expanded row state
        onExpand: handleExpand, // Handle expand/collapse action
      }}
      dataSource={data}
      rowKey="flat_id" // Ensure a unique identifier for each row
    />
  );
};

const ApartmentComplaints = ({ data }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([
      {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
        filters: data.map((ele) => ({
          text: ele.username,
          value: ele.username,
        })),
        filteredValue: filteredInfo.username || null,
        onFilter: (value, record) => record.username.includes(value),
        sorter: (a, b) => a.username.length - b.username.length,
        sortOrder:
          sortedInfo.columnKey === 'username' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: 'Title',
        dataIndex: 'complaintTitle',
        key: 'complaintTitle',
        filters: data.map((ele) => ({
          text: ele.complaintTitle,
          value: ele.complaintTitle,
        })),
        filteredValue: filteredInfo.complaintTitle || null,
        onFilter: (value, record) => record.complaintTitle.includes(value),
        sorter: (a, b) => a.complaintTitle.length - b.complaintTitle.length,
        sortOrder:
          sortedInfo.columnKey === 'complaintTitle' ? sortedInfo.order : null,
        ellipsis: true,
      },

      {
        title: 'Detail',
        dataIndex: 'complaintDetail',
        key: 'complaintDetail',
        filters: data.map((ele) => ({
          text: ele.complaintDetail,
          value: ele.complaintDetail,
        })),
        filteredValue: filteredInfo.complaintDetail || null,
        onFilter: (value, record) => record.complaintDetail.includes(value),
        sorter: (a, b) => a.complaintDetail.localeCompare(b.complaintDetail), // Corrected sorting for strings
        sortOrder:
          sortedInfo.columnKey === 'complaintDetail' ? sortedInfo.order : null,
        ellipsis: true,
      },

      {
        title: 'Solved',
        dataIndex: 'isSolved',
        key: 'isSolved',
        sorter: (a, b) => a.isSolved.length - b.isSolved.length,
        filters: [
          {
            text: 'Yes',
            value: 'Yes',
          },
          {
            text: 'No',
            value: 'No',
          },
        ],
        filteredValue: filteredInfo.isSolved || null,
        onFilter: (value, record) => record.isSolved.includes(value),
        sortOrder:
          sortedInfo.columnKey === 'isSolved' ? sortedInfo.order : null,
        ellipsis: true,
      },
    ]);
  }, [data, filteredInfo, sortedInfo]);

  const handleChange = (pagination, filters, sorter) => {
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
export { DataTable, UserApartments_table, Owners_table, ApartmentComplaints };

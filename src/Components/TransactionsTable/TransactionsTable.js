import React, { useState } from "react";
import { Radio, Select, Table } from "antd";
import searchIcon from '../../assets/search.svg';
import './TransactionsTable.css';

function TransactionsTable({transactions}) {
    const [search,setSearch] = useState('');
    const [typeFilter,setTypeFilter] = useState('');
    const [sortKey,setSortKey] = useState('');

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  const filteredTransactions = transactions.filter((trans)=> trans.name.toLowerCase().includes(search.toLowerCase()) && trans.type.includes(typeFilter))

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  return (
    <div className="transactionsTable__wrapper">
      <div className="search__select__wrapper">
        <div className="search__wrapper">
          <img src={searchIcon} alt="search" />
          <input
            type="search"
            placeholder="Search by Name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <Select
          className="select__wrapper"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </div>
      <div className="table__wrapper">
        <div className="radioGroups__wrapper">
          <h2>My Transactions</h2>
          <Radio.Group
            className="input-radio"
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
        </div>
        <Table dataSource={sortedTransactions} columns={columns} />
      </div>
    </div>
  );
}

export default TransactionsTable;

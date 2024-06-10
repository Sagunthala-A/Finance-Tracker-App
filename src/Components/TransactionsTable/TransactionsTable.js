import React, { useState } from "react";
import { Radio, Select, Table } from "antd";
import searchIcon from '../../assets/search.svg';
import './TransactionsTable.css';
import { parse } from "papaparse";
import { toast } from "react-toastify";

function TransactionsTable({
  transactions,
  addTransaction,
  fetchTransactions,
  exportToCsv,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

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

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transactions of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transactions);
            const newTransaction = {
              ...transactions,
              amount: parseInt(transactions.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

const filteredTransactions =
  transactions.length > 0
    ? transactions.filter(
        (trans) =>
          trans.name &&
          trans.name.toLowerCase().includes(search.toLowerCase()) &&
          (typeFilter ? trans.type === typeFilter : true)
      )
    : [];

 const parseDate = (dateString) => {
   const parts = dateString.split("-");
   if (parts.length === 3) {
     return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
   }
   return new Date(dateString);
 };

 const sortedTransactions =
   filteredTransactions.length > 0
     ? [...filteredTransactions].sort((a, b) => {
         if (sortKey === "date") {
           return parseDate(a.date) - parseDate(b.date);
         } else if (sortKey === "amount") {
           return a.amount - b.amount;
         } else {
           return 0;
         }
       })
     : [];

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "400px",
            }}
          >
            <button
              className="signup__btn"
              style={{ width: "100%" }}
              onClick={exportToCsv}
            >
              Export to CSV
            </button>
            <label
              for="file-csv"
              className="signup__btn blue"
              style={{ width: "100%" }}
            >
              Import from CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              className="import-input"
            />
          </div>
        </div>
        <Table dataSource={sortedTransactions} columns={columns} />
      </div>
    </div>
  );
}

export default TransactionsTable;

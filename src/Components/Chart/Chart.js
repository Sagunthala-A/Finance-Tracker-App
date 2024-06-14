import React from 'react';
import { Line, Pie } from "@ant-design/charts";
import './Chart.css';
import { Row } from 'antd';

function Chart({ transactions, themeColor }) {
  const filteredTrans = [
    ...transactions.sort((a, b) => new Date(a.date) - new Date(b.date)),
  ];

  const data2 = filteredTrans.map((transaction) => {
    return {
      date: transaction.date,
      amount: transaction.amount.toLocaleString(),
    };
  });
  //  console.log(data2)
  const props = {
    data: data2,
    xField: "date",
    yField: "amount",
    label: {
      style: {
        fill: themeColor,
      },
      style: { 
        fill: themeColor
      },
      colorField: "type",
      color: [themeColor, themeColor],
    },
  };

  const spendingData = [];
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      const obj = {
        tag: transaction.tag,
        amount: transaction.amount,
      };
      spendingData.push(obj);
    }
  });

  const props2 = {
    appendPadding: 10,
    data: spendingData,
    angleField: "amount",
    colorField: "tag",
    radius: 1,
  };
  return (
    // <div className="table__wrapper chart__line">
    // <Row gutter={16}>
    <div className="charts__wrapper">
      <div className="table__wrapper chart__line">
        <h2>Financial Statistics</h2>
        <Line {...props} />
      </div>
      <div className="table__wrapper pie__line">
        <h2>Total Spends</h2>
        {spendingData.length > 0 ? (
          <Pie {...props2} />
        ) : (
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "1.1rem",
              fontWeight: "500",
            }}
          >
            Seems like you haven't spent anything till now...
          </p>
          
        )}
      </div>
    </div>
    // </Row>
    // </div>
  );
}

export default Chart;


import React from 'react';
import { Line, Pie } from "@ant-design/charts";
import './Chart.css';
import { Row } from 'antd';

function Chart({transactions}) {
    
    const filteredTrans = [...transactions.sort((a,b) => new Date(a.date) - new Date(b.date))
    ]

     const data2 = filteredTrans.map(transaction =>{
        return {
            date: transaction.date,
            amount: transaction.amount
        }
     })
    //  console.log(data2)
      const props = {
        data: data2,
        xField: "date",
        yField: "amount",
      };

    const spendingData = [];
        transactions.forEach((transaction) => {
            if(transaction.type === "expense"){
                const obj = {
                  tag: transaction.tag,
                  amount: transaction.amount,
                }
                spendingData.push(obj);
            }
        })

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
          <Pie {...props2} />
        </div>
      </div>
    // </Row>
    // </div>
  );
}

export default Chart;


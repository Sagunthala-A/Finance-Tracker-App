import React from 'react';
import { Card, Row } from "antd";
import './Cards.css';
// import './newCard.css';
import Button from '../Button/Button';

function Cards({
  showIncomeModal,
  showExpenseModal,
  income,
  expense,
  currentBalance,
  resetBalance,
}) {
  const style = {
    margin: "0",
    marginTop: "1rem",
  };
  return (
    // text,isBlue,onClick,disable
    <Row className="cards__row">
      <Card className="cards__card" title="Current Balance">
        <p> ₹{currentBalance}</p>
        <Button
          isBlue={true}
          style={style}
          text="Reset Balance"
          onClick={resetBalance}
        />
      </Card>
      <Card className="cards__card" title="Total Income">
        <p>₹{income}</p>
        <Button
          isBlue={true}
          style={style}
          text="Add Income"
          onClick={showIncomeModal}
        />
      </Card>
      <Card className="cards__card" title="Total Expenses">
        <p> ₹{expense}</p>
        <Button
          isBlue={true}
          style={style}
          text="Add Expense"
          onClick={showExpenseModal}
        />
      </Card>
    </Row>
  );
}

export default Cards;

import React from 'react';
import { Card, Row } from "antd";
import './Cards.css';
import Button from '../Button/Button';

function Cards({ showIncomeModal,showExpenseModal}) {
  const style = {
    margin: "0",
    marginTop: "1rem",
  };
  return (
    // text,isBlue,onClick,disable
    <Row className="cards__row">
      <Card className="cards__card" title="Current Balance">
        <p> ₹0</p>
        <Button isBlue={true} style={style} text="Reset Balance" />
      </Card>
      <Card className="cards__card" title="Total Income">
        <p>₹0</p>
        <Button
          isBlue={true}
          style={style}
          text="Add Income"
          onClick={showIncomeModal}
        />
      </Card>
      <Card className="cards__card" title="Total Expenses">
        <p> ₹0</p>
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

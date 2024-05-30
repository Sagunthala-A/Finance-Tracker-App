import React from 'react';
import {  Modal } from 'antd';
import Input from '../Input/Input';

function AddExpenseModal({ handleExpenseCancel, isExpenseModalVisible }) {
  return (
    <div>
      AddExpenseModl
      <Modal
        title="Add Expense"
        visible={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
      >
        <Input/>
      </Modal>
    </div>
  );
}

export default AddExpenseModal
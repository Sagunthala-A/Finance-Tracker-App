import React from 'react';
import { Modal } from 'antd';

function AddIncomeModal({isIncomeModalVisible,handleIncomeCancel}) {
  return (
    <div>
      AddIncomeModal
      <Modal
        title="Add Income"
        visible={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
      />
    </div>
  );
}

export default AddIncomeModal
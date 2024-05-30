import React, { useState } from 'react'
import Header from '../Header/Header';
import Cards from '../Cards/Cards.js';
import AddIncomeModal from '../Modals/AddIncomeModal.js';
import AddExpenseModal from '../Modals/AddExpenseModal.js';

const Dashboard = () => {
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

    function showIncomeModal(){
      setIsIncomeModalVisible(true);
    }
    function showExpenseModal(){
      setIsExpenseModalVisible(true);
    }
    function handleIncomeCancel(){
      setIsIncomeModalVisible(false);
    }
    function handleExpenseCancel(){
      setIsExpenseModalVisible(false);
    }

  return (
    <div>
      <Header />
      <Cards
        setIsIncomeModalVisible={setIsIncomeModalVisible}
        showIncomeModal={showIncomeModal}
        showExpenseModal={showExpenseModal}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
      />
      <AddExpenseModal
        handleExpenseCancel={handleExpenseCancel}
        isExpenseModalVisible={isExpenseModalVisible}
      />
    </div>
  );
}

export default Dashboard
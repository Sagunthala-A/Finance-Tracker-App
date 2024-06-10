import React from 'react';
import './NoTransaction.css';
import NoTransactionImg from '../../assets/transaction.svg';

function NoTransaction() {
  return (
    <div className='noTransaction__wrapper'>
      <img src={NoTransactionImg} alt='No-Transaction_Image'/>
      <p>You Have No Transactions Currently</p>
    </div>
  );
}

export default NoTransaction;
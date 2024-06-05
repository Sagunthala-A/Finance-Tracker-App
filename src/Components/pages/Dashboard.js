import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import Cards from '../Cards/Cards.js';
import AddIncomeModal from '../Modals/AddIncomeModal.js';
import AddExpenseModal from '../Modals/AddExpenseModal.js';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import TransactionsTable from '../TransactionsTable/TransactionsTable.js';

const Dashboard = () => {

    const [user] = useAuthState(auth);

    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
    const [transactions,setTransactions] = useState([]);
    const [income,setIncome] = useState(0);
    const [expense,setExpense] = useState(0);
    const [currentBalance,setCurrentBalance] = useState(0);

    useEffect(()=>{
      // fetchTransactions()
      calculateBalance();
    },[transactions])

    useEffect(() => {
      fetchTransactions();
    }, []);
    

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

    function onFinish(values,type){
      const newTransaction = {
        type: type,
        date: values.date.format("YYYY-MM-DD"),
        amount: parseFloat(values.amount),
        tag: values.tag,
        name: values.name,
      };
      setTransactions([...transactions, newTransaction]);
      addTransaction(newTransaction);
      setIsExpenseModalVisible(false);
      setIsIncomeModalVisible(false);
      calculateBalance();
    }

      async function addTransaction(transaction, many) {
        try {
          const docRef = await addDoc(
            collection(db, `users/${user.uid}/transactions`),
            transaction
          );
          console.log("Document written with ID: ", docRef.id);
          if (!many) {
            toast.success("Transaction Added!");
          }
        } catch (e) {
          console.error("Error adding document: ", e);
          if (!many) {
            toast.error("Couldn't add transaction");
          }
        }
      }

      async function fetchTransactions() {
        // setLoading(true);
        if (user) {
          const q = query(collection(db, `users/${user.uid}/transactions`));
          const querySnapshot = await getDocs(q);
          let transactionsArray = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            transactionsArray.push(doc.data());
          });
          setTransactions(transactionsArray);
          toast.success("Transactions Fetched!");
        }
        // setLoading(false);
      }

      function calculateBalance(){
        let totalIncome = 0;
        let totalExpense = 0;
         transactions.forEach((transaction) => {
           if (transaction.type === "income") {
             totalIncome += transaction.amount;
           } else {
             totalExpense += transaction.amount;
           }
         });

         setIncome(totalIncome);
         setExpense(totalExpense);
         setCurrentBalance(totalIncome - totalExpense);
      }



  return (
    <div>
      <Header />
      <Cards
        setIsIncomeModalVisible={setIsIncomeModalVisible}
        showIncomeModal={showIncomeModal}
        showExpenseModal={showExpenseModal}
        income={income}
        expense={expense}
        currentBalance={currentBalance}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      <AddExpenseModal
        handleExpenseCancel={handleExpenseCancel}
        isExpenseModalVisible={isExpenseModalVisible}
        onFinish={onFinish}
      />

      <TransactionsTable transactions={transactions}/>
    </div>
  );
}

export default Dashboard
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Cards from "../Cards/Cards.js";
import AddIncomeModal from "../Modals/AddIncomeModal.js";
import AddExpenseModal from "../Modals/AddExpenseModal.js";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  writeBatch,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../TransactionsTable/TransactionsTable.js";
import Chart from "../Chart/Chart.js";
import { unparse } from "papaparse";
import NoTransaction from "../NoTransaction/NoTransaction.js";
import Loader from "../Loader/Loader.js";
import { ConfigProvider } from "antd";

const Dashboard = () => {
  const [user] = useAuthState(auth);

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("themeColorDashboard") ||
      getComputedStyle(document.documentElement).getPropertyValue("--theme") ||
      "#2970ff"
  );

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

 useEffect(() => {
   // Fetch transactions
   fetchTransactions();

   // Set theme color from localStorage or fallback to CSS variable or default color
   const color =
     localStorage.getItem("themeColorDashboard") ||
     getComputedStyle(document.documentElement).getPropertyValue("--theme") ||
     "#2970ff";
   setThemeColor(color);
 }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--theme", themeColor);
    localStorage.setItem("themeColorDashboard", themeColor);
  }, [themeColor]);


  function showIncomeModal() {
    setIsIncomeModalVisible(true);
  }
  function showExpenseModal() {
    setIsExpenseModalVisible(true);
  }
  function handleIncomeCancel() {
    setIsIncomeModalVisible(false);
  }
  function handleExpenseCancel() {
    setIsExpenseModalVisible(false);
  }

  async function resetBalance() {
    if (currentBalance === 0) {
      toast.success("Your balance is already zero");
      return;
    }
    if (user) {
      setLoading(true);
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);

      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      try {
        await batch.commit();
        setTransactions([]);
        toast.success("All transactions deleted and balance reset!");
        setLoading(false);
      } catch (e) {
        console.error("Error deleting transactions: ", e);
        toast.error("Couldn't reset balance");
        setLoading(false);
      }
    }
  }

  function onFinish(values, type) {
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
    setLoading(true);
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) {
        toast.success("Transaction Added!");
      }
      setLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
      setLoading(false);
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  function calculateBalance() {
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

  function exportToCsv() {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: themeColor,
            borderRadius: 2,
          },
        }}
      >
        {loading ? (
          <div>
            <Header />
            <Loader />
          </div>
        ) : (
          <div>
            <Header setThemeColor={setThemeColor} />
            <Cards
              setIsIncomeModalVisible={setIsIncomeModalVisible}
              showIncomeModal={showIncomeModal}
              showExpenseModal={showExpenseModal}
              income={income}
              expense={expense}
              currentBalance={currentBalance}
              resetBalance={resetBalance}
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
            {transactions.length > 0 ? (
              <Chart transactions={transactions} themeColor={themeColor} />
            ) : (
              <NoTransaction />
            )}
            <TransactionsTable
              transactions={transactions}
              addTransaction={addTransaction}
              fetchTransactions={fetchTransactions}
              exportToCsv={exportToCsv}
            />
          </div>
        )}
      </ConfigProvider>
    </>
  );
};

export default Dashboard;

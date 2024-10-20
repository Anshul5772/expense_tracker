import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  };

  const getTransactions = async () => {
    const data = await fetchData("transactions"); // Adjust API route as needed
    setTransactions(data);
    setLoading(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const addIncome = async (income) => {
    try {
      const parsedAmount = parseFloat(income.amount);

      // Check if amount is valid and positive
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setError("Amount must be a positive number.");
        return;
      }

      await axios.post(`${BASE_URL}add-income`, {
        ...income,
        amount: parsedAmount, // Send the amount as a number
      });
      getIncomes();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getIncomes = async () => {
    const data = await fetchData("get-incomes");
    setIncomes(data);
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const updateIncome = async (id, updatedIncome) => {
    try {
      const parsedAmount = parseFloat(updatedIncome.amount);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setError("Amount must be a positive number.");
        return;
      }

      await axios.put(`${BASE_URL}update-income/${id}`, {
        ...updatedIncome,
        amount: parsedAmount,
      });
      getIncomes(); // Refresh incomes after update
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const totalIncome = () =>
    incomes.reduce((total, income) => total + income.amount, 0);

  const addExpense = async (expense) => {
    try {
      const parsedAmount = parseFloat(expense.amount);

      // Check if amount is valid and positive
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setError("Amount must be a positive number.");
        return;
      }

      await axios.post(`${BASE_URL}add-expense`, {
        ...expense,
        amount: parsedAmount, // Send the amount as a number
      });
      getExpenses();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getExpenses = async () => {
    const data = await fetchData("get-expenses");
    setExpenses(data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const parsedAmount = parseFloat(updatedExpense.amount);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setError("Amount must be a positive number.");
        return;
      }

      await axios.put(`${BASE_URL}update-expense/${id}`, {
        ...updatedExpense,
        amount: parsedAmount,
      });
      getExpenses(); // Refresh expenses after update
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const totalExpenses = () =>
    expenses.reduce((total, expense) => total + expense.amount, 0);

  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        addIncome,
        getIncomes,
        deleteIncome,
        updateIncome,
        totalIncome,
        expenses,
        addExpense,
        getExpenses,
        deleteExpense,
        updateExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        transactions,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

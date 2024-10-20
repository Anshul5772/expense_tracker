import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome, updateIncome: contextUpdateIncome } =
    useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  const updateIncome = (id, updatedData) => {
    // Call the context function to update the income
    contextUpdateIncome(id, updatedData);
  };

  return (
    <div className=" p-6 bg-[#1f2937] h-screen">
      <div className="w-full px-4 py-2">
        <h1 className="text-2xl font-bold text-white">Incomes</h1>
        <h2 className="flex justify-center items-center bg-[#212c3b] border-[1px] border-white rounded-xl p-4 my-4 text-xl gap-2 text-white">
          Total Income:{" "}
          <span className="text-green-500 text-3xl font-extrabold">
            ₹{totalIncome()}
          </span>
        </h2>
        <div className="income-content flex gap-8">
          <Form />
          <div className="incomes flex-1 overflow-y-auto h-[500px]">
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="bg-green-500"
                  deleteItem={deleteIncome}
                  updateItem={updateIncome} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;

import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import History from '../../History/History';
import { InnerLayout } from "../../styles/Layouts";
import { rupee } from "../../utils/Icons";
import Chart from "../Chart/Chart";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <InnerLayout className="bg-[#1f2937] pb-8">
      <h1 className="text-2xl font-bold ml-4 text-white">Dashboard</h1>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3 h-[350px] bg-[#1f2937] rounded-lg p-6">
          <Chart />
          <div className="space-y-7">
            <div className="flex justify-around">
              <div className="col-span-2 bg-[#212c3b] border border-white rounded-lg p-4 w-[250px] h-[90px] text-center">
                <h2 className="text-lg text-white">Total Income</h2>
                <p className="text-3xl font-bold text-white">
                  {rupee} {totalIncome()}
                </p>
              </div>
              <div className="col-span-2 bg-[#212c3b]  border border-white rounded-lg w-[250px] h-[90px] text-center p-3">
                <h2 className="text-lg text-white">Total Expense</h2>
                <p className="text-3xl font-bold text-white">
                  {rupee} {totalExpenses()}
                </p>
              </div>
            </div>
            <center className="">
              <div className="col-span-2 bg-[#212c3b]  border border-white rounded-lg p-4 w-[250px] h-[90px] text-center">
                <h2 className="text-lg text-white">Total Balance</h2>
                <p className="text-green-400 text-4xl opacity-60">
                  {rupee} {totalBalance()}
                </p>
              </div>
            </center>
          </div>
        </div>
        <div className="col-span-2">
        <History />
          <h2 className="flex justify-between text-lg mb-2 text-white">
            Min <span className="font-bold ">Income</span> Max
          </h2>
          <div className="bg-[#212c3b] border border-white rounded-lg p-4 flex justify-between items-center mb-4">
            <p className="font-semibold text-lg text-white">
              ₹{Math.min(...incomes.map((item) => item.amount))}
            </p>
            <p className="font-semibold text-lg text-white">
              ₹{Math.max(...incomes.map((item) => item.amount))}
            </p>
          </div>
          <h2 className="flex justify-between text-lg mb-2 text-white">
            Min <span className="font-bold">Expense</span> Max
          </h2>
          <div className="bg-[#212c3b] border border-white white rounded-lg p-4 flex justify-between items-center">
            <p className="font-semibold text-lg text-white">
              ₹{Math.min(...expenses.map((item) => item.amount))}
            </p>
            <p className="font-semibold text-lg text-white">
              ₹{Math.max(...expenses.map((item) => item.amount))}
            </p>
          </div>
        </div>
      </div>
    </InnerLayout>
  );
}

export default Dashboard;

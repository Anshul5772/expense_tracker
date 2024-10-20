import React from "react";
import { useGlobalContext } from "../context/globalContext";

function History() {
  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();

  return (
    <div className="flex flex-col gap-4 mb-9">
      <div className="text-white text-center font-bold text-xl">Recent History</div>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div
            key={_id}
            className="bg-[#212c3b] border border-white shadow-md p-4 rounded-lg flex justify-between items-center"
          >
            <p
              className={type === "expense" ? "text-red-500" : "text-green-500"}
            >
              {title}
            </p>
            <p
              className={type === "expense" ? "text-red-500" : "text-green-500"}
            >
              {type === "expense"
                ? `₹${amount <= 0 ? 0 : amount}`
                : `₹${amount <= 0 ? 0 : amount}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default History;

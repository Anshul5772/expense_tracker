import React, { useState } from "react";
import { dateFormat } from "../../utils/dateFormat";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  rupee,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
  edit,
} from "../../utils/Icons";
import Button from "../Button/Button";

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
  updateItem, // Pass this function for updating the item in the parent component
}) {
  // State for toggling edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for form values
  const [formData, setFormData] = useState({
    title,
    amount,
    date,
    category,
    description,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the updateItem function to send the updated data to the parent
    updateItem(id, formData);
    setIsEditing(false); // Exit edit mode
  };

  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  return (
    <div className="bg-[#212c3b] border-[1px] border-white p-4 rounded-xl mb-4 flex items-center gap-4  text-gray-800">
      <div className=" p-2 rounded-lg bg-[#212c3b] flex items-center justify-center text-white">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>

      {isEditing ? (
        // Edit form
        <form className="flex-1 flex flex-col gap-1 " onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mb-2 bg-[#212c3b]  placeholder-white text-white"
            placeholder="Title"
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mb-2 bg-[#212c3b] placeholder-white text-white"
            placeholder="Amount"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mb-2 bg-[#212c3b] placeholder-white text-white"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mb-2 bg-[#212c3b] placeholder-white text-white"
            placeholder="Description"
          />
          <center className="space-x-3">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md "
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </center>
        </form>
      ) : (
        // Display data view
        <div className="flex-1 flex flex-col gap-1 ">
          <h5 className="text-lg relative text-white">{title}</h5>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6 text-gray-300 opacity-80">
              <p className="flex items-center gap-2 ">
                {rupee} {amount}
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                {calender} {dateFormat(date)}
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                {comment} {description}
              </p>
            </div>
            <div className="btn-con flex gap-4 text-white">
              <Button
                icon={trash}
                bPad={"1rem"}
                bRad={"50%"}
                bg={"var(--primary-color"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                onClick={() => deleteItem(id)}
              />

              <Button
                icon={edit} // Use the edit icon here
                bPad={"1rem"}
                bRad={"50%"}
                bg={"var(--primary-color)"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-blue)"}
                onClick={() => setIsEditing(true)} // Same edit logic
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IncomeItem;

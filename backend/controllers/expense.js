const ExpenseSchema = require("../models/ExpenseModel");

//function for adding new expense to the database
exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

//function for retrieving all expenses
exports.getExpense = async (req, res) => {
  try {
    const incomes = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//function for deleting any expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await ExpenseSchema.findByIdAndDelete(id);
    if (!income) {
      return res.status(404).json({ message: "Expense not found!" });
    }
    res.status(200).json({ message: "Expense Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

//function for updating any expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;

  try {
    const expense = await ExpenseSchema.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found!" });
    }

    // Update fields
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    // Save updated expense
    await expense.save();
    res.status(200).json({ message: "Expense Updated", expense });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

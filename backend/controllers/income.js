const IncomeSchema = require("../models/IncomeModel");


//function for adding new income to the database
exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    // Save the income record
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


//function for deleting any income
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await IncomeSchema.findByIdAndDelete(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found!" });
    }
    res.status(200).json({ message: "Income Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

//function for updating any income
exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;

  try {
    const income = await IncomeSchema.findById(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found!" });
    }

    // Update fields
    income.title = title || income.title;
    income.amount = amount || income.amount;
    income.category = category || income.category;
    income.description = description || income.description;
    income.date = date || income.date;

    // Save updated income
    await income.save();
    res.status(200).json({ message: "Income Updated", income });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

import Sales from "../models/Sales.js";

export const addSales = async (req, res) => {
  try {
    const sale = await Sales.create(req.body);
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSales = async (req, res) => {
  const sales = await Sales.find().populate("employee", "name");
  res.json(sales);
};

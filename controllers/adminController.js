const Product = require("../models/productModel");

exports.getSales = async (req, res) => {
  try {
    const sales = await Product.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$sellingPrice" } } },
    ]);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStock = async (req, res) => {
  try {
    const stock = await Product.aggregate([
      { $group: { _id: "$category", totalQuantity: { $sum: "$quantity" } } },
    ]);
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

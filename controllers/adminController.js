const Product = require("../models/productModel");

// Get total sales (sum and dollar)
exports.getSales = async (req, res) => {
  try {
    const sales = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalSalesSum: { $sum: "$sellingPriceSum" },
          totalSalesDollar: { $sum: "$sellingPriceDollar" },
        },
      },
    ]);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get stock by category
exports.getStock = async (req, res) => {
  try {
    const stock = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
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

// Add a new product
exports.createProduct = async (req, res) => {
  const {
    name,
    purchasePriceSum,
    purchasePriceDollar,
    middlePriceSum,
    middlePriceDollar,
    sellingPriceSum,
    sellingPriceDollar,
    quantity,
    category,
    brCode,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      purchasePriceSum,
      purchasePriceDollar,
      middlePriceSum,
      middlePriceDollar,
      sellingPriceSum,
      sellingPriceDollar,
      quantity,
      category,
      brCode,
      artikul: new Date(),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
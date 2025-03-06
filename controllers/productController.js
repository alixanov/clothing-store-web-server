const Product = require("../models/productModel");

const SoldProduct = require("../models/soldProductModel");

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json({ message: "Product added" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
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

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Mahsulot o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// sotilgan mahsulotlar royhati

exports.stockReport = async (req, res) => { };

exports.getStock = async (req, res) => {
  try {
    const stock = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalQuantity: { $sum: "$quantity" },
          products: {
            $push: {
              name: "$name",
              purchasePrice: "$purchasePrice",
              sellingPrice: "$sellingPrice",
              quantity: "$quantity",
              middlePrice: "$middlePrice",
              category: "$category",
              brCode: "$brCode",
              artikul: "$artikul",
            },
          },
        },
      },
    ]);
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

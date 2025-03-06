const SoldProduct = require("../models/soldProductModel");

exports.sellProduct = async (req, res) => {
  try {
    const soldProduct = new SoldProduct(req.body);
    // Saqlashdan oldin malumotlarni tekshirish yoki o'zgartirish kerak bo'lsa, bu yerda qilishingiz mumkin
    await soldProduct.save();
    res.status(201).json({ message: "Mahsulot sotildi", data: soldProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  let debt = req.query.debt === "true";
  try {
    const products = await SoldProduct.find({ debt });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To'lovni amalga oshirish
exports.processPayment = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const soldProduct = await SoldProduct.findById(userId);
    if (!soldProduct) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi." });
    }
    soldProduct.paymentAmount -= Number(amount);

    await soldProduct.save();
    res
      .status(200)
      .json({
        message: "To'lov muvaffaqiyatli amalga oshirildi.",
        data: soldProduct,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purchasePriceSum: { type: Number, required: true }, // Supports decimals
  purchasePriceDollar: { type: Number, required: true }, // Supports decimals
  middlePriceSum: { type: Number, required: true }, // Supports decimals
  middlePriceDollar: { type: Number, required: true }, // Supports decimals
  sellingPriceSum: { type: Number, required: true }, // Supports decimals
  sellingPriceDollar: { type: Number, required: true }, // Supports decimals
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  brCode: { type: String, required: true },
  artikul: { type: String, default: new Date() },
});

module.exports = mongoose.model("Product_stamatolog", productSchema);
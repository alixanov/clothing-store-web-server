const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  middlePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  brCode: { type: String, required: true },
  artikul: { type: String, default: new Date() }
});

module.exports = mongoose.model("Product_stamatolog", productSchema);

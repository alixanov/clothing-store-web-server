const { Schema, model } = require("mongoose");

const soldProductSchema = new Schema(
  {
    fullname: { type: String },
    phone: { type: String },
    debt: { type: Boolean },
    address: { type: String },
    totaldebt: { type: String },
    paymentAmount: { type: Number, required: true },
    totalProduct: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        sellingPrice: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("SoldProduct", soldProductSchema);

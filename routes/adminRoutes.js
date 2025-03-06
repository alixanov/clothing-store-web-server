const express = require("express");
const router = express.Router();
const {
  getSales,
  getStock,
  updateProduct,
} = require("../controllers/adminController");

router.get("/sales", getSales);
router.get("/stock", getStock);
router.put("/update/:id", updateProduct);

module.exports = router;

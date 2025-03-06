const { Router } = require("express");
const router = Router();
const SoldProduct = require("../controllers/soldProductsController");

// Sotilgan mahsulotlar ro'yxatini olish
router.get("/sold", SoldProduct.getProducts);

// Yangi sotilgan mahsulot qo'shish
router.post("/sold", SoldProduct.sellProduct);

// Qarzni to'lash uchun yangi marshrut
router.post("/payment", SoldProduct.processPayment); // To'lovni amalga oshirish

module.exports = router;

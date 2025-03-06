const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // connectDB modulini to‘g‘ri yo‘naltirish
const app = express();
const PORT = process.env.PORT || 8080;



// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // CORS middleware qo'shish
app.use(express.json());
console.log("Connected to MongoDB");


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api", require("./routes/soldRouter"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

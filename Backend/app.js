const express = require("express");
const cors = require('cors')
const CategoriesRoutes = require("./routes/Foods/Categories");
const mongoose = require("mongoose");
const foodinforamation=require("./routes/Foodinf")
const order= require('./routes/Foods/Order')
const user = require('./routes/authendication')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection error:", err));
const app = express();
app.use(express.json());
app.use("/api/categories",CategoriesRoutes);
app.use('/api/foodinformation',foodinforamation)
app.use('/api/orders',order)
app.use('/api/user',user) 
app.use(cors())
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`))


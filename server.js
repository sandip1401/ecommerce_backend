const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
connectDB();
require("dotenv").config();
//https://ecommerce-backend-rxl1.onrender.com
app.use(
    cors({
        origin:"https://enquiry-app-tsii.onrender.com",
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    })
)

app.use(express.json());

const bodyparser = require("body-parser");
app.use(bodyparser.json());
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/produuctRoutes");
const eneqRoutes = require("./routes/eneqRoutes");
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/enqury", eneqRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port`, PORT);
});

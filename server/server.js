const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const signupRoutes = require("./api/signUp");
const authRoutes = require("./api/loginAuth");

const app = express();



app.use(
    cors(
    //   {
    //   origin: "http://localhost:3000",
    //   credentials: true,
    //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    //   allowedHeaders: ["Content-Type", "Authorization"],
    // }
  )
  );
  
//   // Handles preflight OPTIONS requests
//   app.options("*", cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   }));
app.use(express.json());
app.use(cookieParser());



  
// MongoDB Connection
mongoose
  .connect("mongodb+srv://fardeenjobs:e54Cx4oRtalq6N2d@skailama.1krevuo.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/signup", signupRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server is running on port 5000"));

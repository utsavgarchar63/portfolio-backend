const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const contactSchema = require("./model/contactSchema");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  res.send("Hello Utsav");
});
app.post("/contact", async (req, res) => {
  try {
    const userData = await contactSchema.create(req.body);
    return res.status(200).json({
      success: true,
      messsage: "Submited Successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

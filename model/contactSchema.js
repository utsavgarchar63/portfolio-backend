const mongoose = require("mongoose");

// Create a schema for Database

const contactSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    message: { type: String },
  },
  { timestamps: true, versionKey: false, autoCreate: true }
);

// Export
module.exports = mongoose.model("contacts", contactSchema, "contacts");

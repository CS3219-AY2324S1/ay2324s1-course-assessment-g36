const mongoose = require("mongoose");
const path = require("path");

async function connectToDb() {
  const URI = process.env.MONGODB_URI;

  try {
    await mongoose.connect(URI);
    return;
  } catch (error) {
    console.error("Connection Failed", error);
    throw error;
  }
}

module.exports = connectToDb;

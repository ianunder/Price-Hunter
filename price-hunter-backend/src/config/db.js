const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();


const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function connectDB() {
    try {
      await client.connect();
      console.log("MongoDB connected successfully!");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }
  

  module.exports = { connectDB, client };
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const app = express();
const uri = process.env.MONGODB_URI;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend origin
    credentials: true, // Allow credentials
  })
);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongoDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Connect Mongoose
    await mongoose.connect(uri);
    console.log("Connected to MongoDB using Mongoose.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

async function closeMongoDBConnection() {
  try {
    // Close Mongoose connection
    await mongoose.connection.close();
    console.log("Mongoose connection closed");

    // Close MongoClient connection
    await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Failed to close connections:", error);
    throw error;
  }
}

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const beanRoutes = require("./routes/beanRoutes");
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/beans", beanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, async () => {
  try {
    await connectToMongoDB(); // Connect to MongoDB
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});

// Close connections when exiting
process.on("SIGINT", async () => {
  try {
    await closeMongoDBConnection();
    console.log("Connections closed due to application termination");
    process.exit(0);
  } catch (error) {
    console.error("Failed to close connections:", error);
    process.exit(1);
  }
});

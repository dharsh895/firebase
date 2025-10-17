const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all origins (adjust in production!)
app.use(cors({origin: true}));
app.use(express.json());

// Simple GET route
app.get("/hello", (req, res) => {
  res.json({message: "Hello from Firebase!"});
});

// Simple POST route
app.post("/echo", (req, res) => {
  res.json({youSent: req.body});
});

// Export the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);

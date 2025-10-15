// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
 
mongoose.connect("mongodb+srv://admin:admin08@cluster8.p2ww7tt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster8", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("MongoDB connected"));
 
const CartSchema = new mongoose.Schema({
  name: String,
  gmail: String,
  item: String,
  quantity: String,
  price: String
});
const Cart = mongoose.model("Cart", CartSchema);
 
app.post("/api/cart", async (req, res) => {
  const newItem = new Cart(req.body);
  await newItem.save();
  res.json({ message: "Item added successfully!" });
});
 
app.get("/api/cart", async (req, res) => {
  const items = await Cart.find();
  res.json(items);
});
 
app.put("/api/cart/:id", async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Item updated successfully!" });
});
 
app.delete("/api/cart/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted successfully!" });
});
 
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

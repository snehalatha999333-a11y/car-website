const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb+srv://admin:1234567890@cluster0.dkfoyji.mongodb.net/carDB?appName=Cluster0")
.then(() => console.log("MongoDB Connected 🚀"))
.catch((err) => console.log(err));

// Car model
const Car = mongoose.model("Car", {
  name: String,
  price: Number,
  image: String
});

// Get cars
app.get("/cars", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Add car
app.post("/cars", async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json(car);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
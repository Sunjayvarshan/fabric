const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/usermodel");
const Product = require("./models/productmodel");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/register", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 8000;

app.post("/api/register", async (req, res) => {
  // console.log(req.body);
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        status: "error",
        error: "This email already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();

    res.json({ status: "ok", data: savedUser });
  } catch (err) {
    res.json({ status: "error", error: "An error occurred" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "salt"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
  // const { email, password } = req.body;
  // try {
  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     return res.json({ status: "error", user: false });
  //   }
  //   if (user) {
  //     if (password !== user.password) {
  //       return res.json({ status: "error", user: false });
  //     }
  //   }
  //   res.json({ status: "ok", user: true });
  // } catch (err) {
  //   res.json({ status: "error", error: "An error occurred" });
  // }
});

app.get("/api/admin", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "salt");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/admin", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "salt");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen(port, () => {
  console.log("server started");
});

app.post("/api/addproduct", async (req, res) => {
  // console.log(req.body);
  const { name, price, quantity, description } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      quantity,
      description,
    });

    const savedProduct = await newProduct.save();

    res.json({ status: "ok", data: savedProduct });
  } catch (err) {
    res.json({ status: "error", error: "An error occurred" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    await Product.findByIdAndDelete(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

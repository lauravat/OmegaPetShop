const express = require("express");
const Product = require("../models/productModel");
const User = require("../models/usersModels");

const router = express.Router();

router.get("/", async (req, res) => {
  const buys = await Product.find().sort({buys: 1})
  return res.json({
    succes: true,
    data: buys,
  });
});

router.get('/store/:id', async (req, res) => {
  try {
    const storeId = req.params.id;
    console.log(storeId);
    const products = await Product.find({ 'Store.id': storeId });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/category/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({ _id: userId, role: "Tienda" });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Usuario no encontrado o no tiene el rol 'Tienda'.",
        });
    }

    const products = await Product.find({ "Store": userId })
        .populate('categories', 'name'); // Specify the fields you want to include

    res.json({
        success: true,
        data: products,
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: error.message,
    });
}
});

router.get("/:id", async (req, res) => {
  const buyId = req.params.id;

  const buy = await Product.findById(buyId);
  return res.json(buy);
});

router.post("/", async (req, res) => {
  const newBuy = await Product.create(req.body);
  return res.json({
    succes: true,
    data: newBuy,
  });
});

router.put("/:id", async (req, res) => {
  buyId = req.params.id;
  updBuy = await Product.findByIdAndUpdate(
    buyId, 
    req.body, {
    new: true,
  }
  )
  return res.json({
    succes:true,
    data: updBuy
  });
});

router.delete("/:id", async (req,res) =>{
    const buyId =req.params.id;
    const products = await Product.findByIdAndDelete(
        buyId
    )
    res.json({
        succes: true,
        data: products
    });
});
module.exports = router;
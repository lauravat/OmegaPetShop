const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const buys = await Product.find().sort({buys: 1})
  return res.json({
    succes: true,
    data: buys,
  });
});

router.get("/:id", async (req, res) => {
  const buyId = req.params.id;

  const buy = await Product.findById(buyId);
  return res.json({
    succes: true,
    data: buy,
  });
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
const express = require("express");
const User = require("../models/usersModels");

const router = express.Router();

router.get("/", async (req, res) => {
  const buys = await User.find();

  return res.json({
    succes: true,
    data: buys,
  });
});

router.get("/store", async (req, res) => {
  try {
    const stores = await User.find({ role: "Tienda" });

    return res.json({
      stores
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
}
});

router.get("/:id", async (req, res) => {
  const buyId = req.params.id;

  const buy = await User.findById(buyId);
  return res.json({
    succes: true,
    data: buy,
  });
});

router.post("/", async (req, res) => {
  const newBuy = await User.create(req.body);
  return res.json({
    succes: true,
    data: newBuy,
  });
});

router.put("/:id", async (req, res) => {
  buyId = req.params.id;
  updBuy = await User.findByIdAndUpdate(
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
    const users = await User.findByIdAndDelete(
        buyId
    )
    res.json({
        succes: true,
        data: users
    });
});
module.exports = router;
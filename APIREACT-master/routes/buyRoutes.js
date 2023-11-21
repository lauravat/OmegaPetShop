const express = require("express");
const Buy = require("../models/buyModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const buys = await Buy.find();

  return res.json({
    succes: true,
    data: buys,
  });
});

router.get("/:id", async (req, res) => {
  const buyId = req.params.id;

  const buy = await Buy.findById(buyId);
  return res.json({
    succes: true,
    data: buy,
  });
});

router.post("/", async (req, res) => {
  const newBuy = await Buy.create(req.body);
  return res.json({
    succes: true,
    data: newBuy,
  });
});

router.put("/:id", async (req, res) => {
  buyId = req.params.id;
  updBuy = await Buy.findByIdAndUpdate(
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
    

})
module.exports = router;
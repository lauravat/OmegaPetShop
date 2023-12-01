const express = require("express");
const User = require("../models/usersModels");

const router = express.Router();

router.post('/login', async (req,res) =>{
    const { email, password } = req.body
    try {
      const userFound = await User.findOne({ email })
      if (!userFound) {
        return res.status(400).json({
          message: 'User not found'
        })
      }
  
      if (password !== userFound.password) {
        return res.status(400).json({
          message: 'Incorrect password'
        })
      }
  
      return res.json({
        succes: true,
        data: userFound
      })
    } catch (error) {
      console.error('Error al obtener los users:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
})

router.post('/register', async (req,res) =>{
    let { name, lastname, email, phone, adress, role, password } = req.body
    const userFound = await User.findOne({ email })
    if (role === null || role !== ('Tienda' || 'Usuario')) {
      role = 'Usuario'
    }
    if (userFound) {
        return res.status(400).json({
        message: 'Email already registered'
        })
    }
    try {
        const user = new User({
            name,
            lastname,
            email,
            phone,
            adress,
            role,
            password
        })
        console.log(user)
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error al obtener los users:', error)
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;

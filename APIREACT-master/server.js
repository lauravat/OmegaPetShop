const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/db')
const authRoutes = require('./routes/authRoutes.js')
const buyRoutes = require('./routes/buyRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const usersRoutes = require('./routes/usersRoutes.js')
const cors = require("cors")

dotenv.config({
    path:'./config/.env'
})

const app = express()

app.use(express.json())
app.use(cors())

connectDb()


app.use(authRoutes)

app.use('/usuario',
    usersRoutes)

app.use('/producto',
    productRoutes)

app.use('/compra',
    buyRoutes)

app.use('/categoria',
    categoryRoutes)

const puerto = 4000

app.listen(puerto , console.log(`servidor ejecutando en puerto ${puerto}`))
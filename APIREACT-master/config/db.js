const colors = require ('colors')
const mongoose = require ('mongoose')

//conectar la base de datos

async function connectDb() {
    const conn = await mongoose.connect('mongodb://localhost:27017/Veterinaria',{
        autoIndex:true,
        family:4
    })
    console.log (`conexion exitosa a mongoBD:${conn.connection.host}`)
}

module.exports = connectDb

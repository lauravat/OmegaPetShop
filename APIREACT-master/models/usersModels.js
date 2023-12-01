const mongoose = require("mongoose");

const UsercampSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,
             "el nombre es requerido"],
        maxlength: [100, "nombre de bootcamp no mayor a 50 caracteres"]
    },
    lastname:{
        type: String,
        required: [true,
             "el apellido es requerido"],
        maxlength: [100, "apellido del usuario no mayor a 100 caracteres"]
    },
    email: {
        type: String,
        require: [true,
            "el correo es requerido"],
        unique: true
    },
    phone:{
        type: Number,
        maxlength: [10, "telefono de bootcamp no mayor a 10 digitos"]
    },
    adress:{
        type:String,
        required: [true,
            "la direccion es requerida"],
        maxlength:[100, "direccion de bootcamp no mayor a 100 caracteres "]
    },
    role: {
        type: String,
        enum: ['Tienda', 'Usuario'],
        default: 'User',
        require: true
    },
    password:{
        type:String,
        required: [true,
            "la contraseña es requerida"],
        unique: true, 
        maxlength:[400, "direccion de bootcamp no mayor a 100 caracteres "]
    }
})

module.exports = mongoose.model('User', UsercampSchema)
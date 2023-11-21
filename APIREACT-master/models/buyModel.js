const mongoose = require("mongoose");

const BuycampSchema = mongoose.Schema({
    products:{
        type: Array,
        required: [true,
             "el nombre del producto es requerido"],
        maxlength: [100, "nombre de bootcamp no mayor a 100 caracteres"]
    },

    user:{
        type:String,
        required: [true,
            "el nombre del usuario es requerida"],
        maxlength:[100, "nombre del usuario no mayor a 100 caracteres "]
    }
})

module.exports = mongoose.model('Buy', BuycampSchema)
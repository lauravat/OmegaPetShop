const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductcampSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    nameProduct:{
        type: String,
        required: [true,
            "el nombre del producto es requerido"],
        maxlength: [100, "nombre de bootcamp no mayor a 100 caracteres"]
    },
    imgUrl:{
        type:String,
        required: [true,
            "la imagen del producto es necesaria"]
    },
    category:{
        type: String,
        required: [true,
            "La categoria del producto es necesaria"],
        maxlength: [100, "nombre de la categoria maximo 100 caracteres"]
    },
    price:{
        type: Number,
        required:[true, "El costo del producto es requerido"],
    },
    description:{
        type:String,
        required: [true,
            "la descripción es requerida"],
        maxlength:[100, "descripcion del producto no mayor a 100 caracteres "]
    },
    cantidad:{
        type:Number,
        required:[true, "La cantidad del producto es requerida"],
        maxlength:[50, "Cantidad de productos no mayor a 50"]
    },
    reviews: [
        {
        rating: Number,
        text: String,
        }
    ],
    avgRating: Number,
})

ProductcampSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Product', ProductcampSchema)
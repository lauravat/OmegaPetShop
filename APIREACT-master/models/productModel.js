const mongoose = require("mongoose");
const Category = require("./categoriesModel");

const UserSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
      type: String,
      required: true
    }
})

const ProductcampSchema = mongoose.Schema({
    nameProduct:{
        type: String,
        required: [true,
            "el nombre del producto es requerido"],
        maxlength: [100, "nombre de bootcamp no mayor a 100 caracteres"]
    },
    Store: UserSchema,
    imgUrl:{
        type:String,
        required: [true,
            "la imagen del producto es necesaria"]
    },
    categories: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        name:{
            type:String,
            required: [true, "el nombre de categoria es necesario"]
        } 
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

module.exports = mongoose.model('Product', ProductcampSchema)
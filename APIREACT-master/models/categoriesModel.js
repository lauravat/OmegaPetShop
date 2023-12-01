const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre de la categoría es requerido"],
        maxlength: [100, "Nombre de la categoría no mayor a 100 caracteres"]
    },
    description: {
        type: String,
        maxlength: [250, "Descripción de la categoría no mayor a 250 caracteres"]
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Category', CategorySchema);
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please add title'],
        trim: true,
    },
    ingredients: {
        type: String,
        required: [true, 'please add ingredients'],
        trim: true,
    },
    preparation: {
        type: String,
        required: false,
        trim: true,
    },
    image: {
        type: String, // almacena la URL de la imagen
        required: false,
        trim: true,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema)
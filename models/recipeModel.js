const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please add title'],
        trim: true,
    },
    ingredients: {
        type: [{
            name: {
                type: String,
                trim: true,
            },
            category: {
                type: String,
                trim: true,
            },
        }],
        required: [true, 'please add ingredients'],
    },
    // preparation: {
    //     type: String,
    //     required: false,
    //     trim: true,
    // },
    // image: {
    //     public_id: String,
    //     urlImage: String
    // },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true,
    },
},
    { timestamps: true }
);

// recipeSchema.methods.setImage = function setImage(imageCloud) {
//     this.image = `${imageCloud}`
// }

module.exports = mongoose.model('Recipe', recipeSchema)
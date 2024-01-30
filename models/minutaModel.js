const mongoose = require('mongoose');

const minutaSchema = new mongoose.Schema({
    rangoFecha: {
        type: String,
        required: true,
        trim: true,
    },
    dias: {
        type: Object,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Minuta', minutaSchema)
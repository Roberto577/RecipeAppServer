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
},
    { timestamps: true }
);

module.exports = mongoose.model('Minuta', minutaSchema)
const mongoose = require('mongoose');

const minutaSchema = new mongoose.Schema({
    Lunes: {
        type: { title: String, day: String },
        required: true,
    },
    Martes: {
        type: { title: String, day: String },
        required: true,
    },
    Miercoles: {
        type: { title: String, day: String },
        required: true,
    },
    Jueves: {
        type: { title: String, day: String },
        required: true,
    },
    Viernes: {
        type: { title: String, day: String },
        required: true,
    },
    Sabado: {
        type: { title: String, day: String },
    },
    Domingo: {
        type: { title: String, day: String },
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Minuta', minutaSchema)
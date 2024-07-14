//Avec un livre
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    editeur: {
        type: String,
        trim: true,
        required: [true, "l'éditeur est requis"],
    },
    auteur: {
        type: String,
        trim: true,
        required: [true, "l'auteur est requis"]
    },
    book_name: {
        type: String,
        trim: true,
        required: [true, "veuillez insérer le nom du livre"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', Book);
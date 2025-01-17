const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// on importe le module bcrypt

const bcrypt = require ('bcrypt');

const User = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'le nom est requis']
    },
    firstname:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: [true, 'L\'email est requis'],
        unique: true, //index unique
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
    }
}, {
    // ajoute 2 champs au document createdAt et updateAt
    timestamps: true
});

//hash le mot de passe quand il est modifié

User.pre('save', function(next){
    if (!this.isModified('password')){
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);

    next();
});



module.exports = mongoose.model('User', User);
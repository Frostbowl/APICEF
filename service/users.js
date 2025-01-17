//on importe le modèle de données
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

//on exporte le callback afin d'y accéder dans notre gestionnaire de routes
//ici c'est le callback qui servira à ajouter un user avec son id

exports.getById = async(req, res, next) => {
    const id = req.params.id 

    try{
        let user = await User.findById(id);
        if (user){
            return res.status(200).json(user);
        }
        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async(req, res, next)=>{
    const temp = ({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    });

    try{
        let user = await User.create(temp);
        return res.status(201).json(user);
    } catch(error) {
        return res.status(501).json(error);
    }
};

exports.update = async (req, res, next) =>{
    const id = req.params.id
    const temp = ({
        name: req.body.name,
        firstname: req.body.firstname
    });
    try {
        let user = await User.findOne({_id: id});

        if (user) {
            Object.keys(temp).forEach((key) =>{
                if (!!temp[key]){
                    user[key] = temp[key];
                }
            });
            await user.save();
            return res.status(201).json(user);
        }
        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

// ici c'est le callback qui servira à supprimer un user

exports.delete = async (req, res, next) => {
    const id = req.params.id

    try {
        await User.deleteOne ({ _id: id});

        return res.status(204).json('delete_ok');
    } catch (error){
        return res.status(501).json(error);
    }
}

//méthode permettant la vérification du mot de passe

exports.authenticate = async (req, res, next)=>{
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email: email}, '-__v -createdAt -updateAt');

        if (user){
            bcrypt.compare(password, user.password, function(err, response){
                if(err){
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;

                    const expiresIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn
                    });

                    res.header('Authorization', 'Bearer' + token);

                    return res.status(200).json('authenticate_succeed');
                }

                return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch(error){
        return res.status(501).json(error);
    }
}
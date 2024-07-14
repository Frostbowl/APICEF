const Book = require ('../models/books');
const bcrypt = require ('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;

exports.getById = async(req, res, next) => {
    const id = req.params.id 

    try{
        let book = await Book.findById(id);
        if (book){
            return res.status(200).json(book);
        }
        return res.status(404).json('book_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res, next) => {
    const temp = ({
        editeur: req.body.editeur,
        auteur: req.body.auteur,
        book_name: req.body.book_name

    });
    try{
        let book = await Book.create(temp);
        return res.status(201).json(book);
    } catch(error) {
        return res.status(501).json(error);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id
    const temp = ({
        editeur: req.body.editeur,
        auteur: req.body.auteur,
        book_name: req.body.book_name
    });
    try {
        let book = await Book.findOne({_id: id});

        if (book){
            Object.keys(temp).forEach((key) =>{
                if (!!temp[key]){
                    book[key] = temp[key];
                }
            });
            await book.save();
            return res.status(201).json(book);
        }
        return res.status(404).json('book_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id

    try{
        await Book.deleteOne ({_id: id});
        return res.status(204).json('delete_book_ok');
    } catch(error){
        return res.status(501).json(error);
    }
}

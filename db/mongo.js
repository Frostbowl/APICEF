const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser : true,
    dbName : 'apinode'
};

exports.initClientDbConnection = async()=>{
    try{
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('connecté à la base Mongo');
    } catch (error){
        console.log(error);
        throw error
    }
}
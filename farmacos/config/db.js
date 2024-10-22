const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado a la BD.");
    }catch(error){
        console.error(error);
        process.exit(1); //Detener la app
    }
};

module.exports = connectDB;
const mongoose = require("mongoose");
const listaSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',  //Relaciona con model User
        required: true,
    },
    farmacos:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Farmaco', //Relaciona con model Farmaco
            required: true,
        }
    ],
    categoria:{
            type: String,
            required: true,
        }
});

const Lista = mongoose.model('Lista', listaSchema);
module.exports = Lista;
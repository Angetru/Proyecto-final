const mongoose = require("mongoose");
const farmaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    dose: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
    times:{
        type: String,
        required: true,
    },
    startdate:{
        type: String,
        required: true,
    },
    enddate:{
        type: String,
        required: true,
    },
});

const Farmaco = mongoose.model('Farmaco', farmaSchema);
module.exports = Farmaco;
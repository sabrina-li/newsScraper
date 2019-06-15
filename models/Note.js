const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    notes:{
        type:String,
        default:undefined
    }
});

module.exports = NoteSchema;
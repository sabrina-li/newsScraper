const mongoose = require("mongoose");
const NoteSchema = require("./Note");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    summery:{
        type:String
    },
    publishedOn:{
        type:Date
    },
    notes:{
        type:[NoteSchema]
    }
});

const Article = mongoose.model("Article",ArticleSchema);

module.exports = Article;
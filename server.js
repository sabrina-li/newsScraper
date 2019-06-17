const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
 
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
const db = require("./models");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static("public"))
 
app.get('/',  async (req, res) => {
    const articles = await db.Article.find({}).sort({ publishedOn : -1 });
    res.render('articles',{articles:articles});
});

app.get("/api/scrape", async (req,res)=>{
    //TODO: async error handling
    const response = await axios.get("https://www.npr.org/sections/news/")
    const $ = cheerio.load(response.data);
    $('div.item-info').each(async (idx,element)=>{
        const title = $(element).find(".title").text();
        const summery = $(element).find(".teaser").text();
        const time = $(element).find(".teaser").find("time").text();
        const link = $(element).find(".title").children("a").attr("href");

        // const dbArticle = await db.Article.create({title:title,summery:summery});
        // const update = await db.Article.updateOne({title:"Hong Kong Leader Suspends Controversial Extradition Bill"},{$set:{title:title,summery:summery,notes:[{notes:"asdf"}]}});
        const dbArticle = await db.Article.findOneAndUpdate({title:title},{$set:{title:title,summery:summery,publishedOn:new Date(time.replace("•",'')),link:link}}, { upsert : true , useFindAndModify : true});
    });//TODO: promise.all

    //Mock slow response
    // setTimeout(() => {
    // }, 1000);
    res.send("Scrape Complete");
    
});
app.post("/api/addnotes/:id", async (req,res)=>{
    //TODO: async error handling
    const id = req.params.id;
    await db.Article.updateOne({_id:id},{$push:{notes:{notes:req.body.note}}});
    // res.send("Note inserted");
    res.redirect('/');//redirect to initial page after insert notes
});
app.delete("/api/:articleid/:noteid", async (req,res,next)=>{
    //TODO: async error handling
    const noteID = req.params.noteid;
    const articleID = req.params.articleid;

    await db.Article.updateOne({_id:articleID},{$pull:{notes:{_id:noteID}}});

    res.send("Note Deleted")
});


 
app.listen(3000);
# NPR News Scraper

This scrapes NPR News articles. Display them in reverse chronological order, and allow users to add notes on their favorites. 

The website displays the title and the teaser portion from NPR News. Along with link pointing to the News from NPR.

You can add notes on any news you like and all notes are public. For each command you can remove by clicking on the "x" button. Note this is also public at the moment, anyone can remove any notes they want.

App hosted [here](https://sab-newsscrapter.herokuapp.com)

## Tech Stack
Frontend: vanilla js, css
Server side: Node/Express, handlebars for server-side rendering, Axios/Cheerio
DB: MongoDB/Mongoose

Node Modules used:
1.  mongoose
2.  express
3.  express-handlebars
4.  axios
5.  cheerio
6.  body-parser



## Getting Started
Clone the repo and install dependencies

```
npm install
```
Make sure you have MongoDB running on your and the connections string point to your DB.

Run the following command to start the server from your root directory of the project:
```
node server.js
```

## Screenshots

Scraping the news

![scraping-gif](./scraping.gif)

Adding and removing notes

![adding-removing-notes](./adding-removing-notes.gif)

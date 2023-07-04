const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
app.use(express.static("public"));
const port = 3000;

const wikiSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", wikiSchema);

app.route('/articles')
  .get((req, res) => {
    Article.find({})
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log(error);
      });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    })
    newArticle.save()
      .then(() => {
        res.send("Succeeded sending the data to the database");
      })
      .catch(error => {
        res.send(error);
      });
  })
  .delete((req, res) => {
    Article.deleteMany()
      .then(() => {
        res.send("Successfully deleted all the articles from the database");
      })
      .catch(error => {
        res.send(error);
      });
  });

app.route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle })
      .then((result) => {
        res.send(result);
      })
      .catch(error => {
        res.send(error);
      })
  })
  .put((req, res) => {
    Article.updateOne({ title: req.params.articleTitle }, { title: req.body.title, content: req.body.content })
      .then(() => {
        res.send("Successfully updated the document using put method");
      })
      .catch(error => {
        res.send(error);
      })
  })
  .patch((req, res) => {
    Article.updateOne({ title: req.params.articleTitle }, { $set: req.body })
      .then(() => {
        res.send("successfully the updated the document using patch method");
      })
      .catch((error) => {
        res.send(error);
      })
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle })
      .then(() => {
        res.send("Successfully deleted the document " + req.params.articleTitle + " using delete method");
      })
      .catch((error) => {
        res.send(error);
      })
  });

app.listen(port, function () {
  console.log("Listening on port 3000");
});

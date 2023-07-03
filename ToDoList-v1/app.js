const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
app.use(express.static("public"));
const port = 3000;
const _ = require("lodash");
let whichDay;

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemsSchema);

const things = [
  {
    name: "Do your homework",
  },
  {
    name: "Clean your Garden",
  },
  {
    name: "Do your next project",
  },
  {
    name: "Eat your food",
  },
];

// Item.insertMany(things);

app.get("/", function (req, res) {
  const today = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  whichDay = today.toLocaleDateString("en-us", options);
  Item.find({})
    .then((items) => {
      if (items.length === 0) {
        Item.insertMany(things);
        res.redirect("/");
      } else {
        res.render("list", { listTitle: whichDay, newItems: items });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const listSchema = mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model("List", listSchema);

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName })
    .then((list) => {
      if (list) {
        res.render("list", { listTitle: customListName, newItems: list.items });
      } else {
        const newList = new List({
          name: customListName,
          items: things,
        });
        newList.save();
        res.redirect("/" + customListName);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/", function (req, res) {
  console.log(req.body);
  const itemName = req.body.firstInput;
  const listName = req.body.list;
  console.log(listName);

  const newItem = new Item({
    name: itemName,
  });

  if (listName === whichDay) {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
      .then((foundList) => {
        foundList.items.push(newItem);
        foundList.save();
        res.redirect("/" + listName);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.post("/delete", function (req, res) {
  const itemId = req.body.checkbox;
  const listName = req.body.hiddenInput;
  console.log(listName);

  if (listName === whichDay) {
    Item.findByIdAndDelete(itemId)
      .exec()
      .then((result) => {
        console.log(result);
        // Handle the result after the document is deleted
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occur during the deletion process
      });
    res.redirect("/");
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: itemId } } }
    ).then(() => {
      res.redirect("/" + listName);
    });
  }
});

// app.get("/work", function (req, res) {
//     res.render("list", { listTitle: "Work List", newItems: workItems });
// });

app.listen(port, function () {
  console.log("Listening on port 3000");
});
  //i redirected the man of the whole in the hole of the snake if the man got the money then i got the things to made
  //then i will have the whole thing in the since i then listen to the whole app whole which is built in the egypt 
  //i will have to perform the whole procedure i wil be graduating in the year this will lead to the success
  // which has great potential what will be the greatest of the whole time and there is the greatest the grapes the whole\\\
  // Hey this is the suMan pandit i am form milky way galaxy i am from the whole universe in the whole the in the lif
  // this is the meant to be the success rate of nepal by the means of it all the whole universe will collapse in the 
  //this is the universe of lifetime of the whole universe in the whole massage in the means of transportation in
  // in the whole universe in the world that is created by me in the whole universe this is the most powerful 
  //being in the planet this is the worst feeling of the all of the whole universe if the universe is created by me.
  // as we all know the science of the powerful of the issac newton.
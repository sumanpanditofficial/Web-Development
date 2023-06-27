const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

var items = ["Cook food", "Serve food", "Eat food"];
let workItems =[];

app.use(express.static('public'));


app.get("/", function (req, res) {

    const today = new Date();
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    var whichDay = today.toLocaleDateString("en-us", options);

 
    res.render("list", { listTitle: whichDay, newItems: items });


})

app.post("/", function (req, res) {
    console.log(req.body);
    let item = req.body.firstInput;
    if (req.body.list === ' Work List '){
        workItems.push(item);
        res.redirect("/work");
    }
  else{
    items.push(item);
    res.redirect("/");
  }

}); 


app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newItems: workItems});
});






app.listen(port, function () {
    console.log("Listening on port 3000")
});
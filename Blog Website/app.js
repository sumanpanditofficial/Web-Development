const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
let titleArray = [];
let contentArray = [];
let pageNum;


app.get("/", function (req, res) {
    res.render("index", { titleInputs: titleArray, contentInputs: contentArray });
})

app.get("/HomeAction", function (req, res) {
    res.redirect("/");
});

app.get("/ContactAction", function (req, res) {
    res.render("contact");
});

app.get("/AboutAction", function (req, res) {
    res.render("about");
})

app.get("/BlogAction", function (req, res) {
    res.redirect("/");
})

app.get("/compose", function (req, res) {
    res.render("compose");
})

app.get("/page", function (req, res) {
    res.render("singlePage", { pageTitle: titleArray[pageNum], pageContent: contentArray[pageNum] });
})

function pageFinder(page) {
    let pageNo;
    for (let i = 0; i < titleArray.length; i++) {
        if (page === titleArray[i]) {
            pageNo = i;
        }
    }
    return pageNo;
}


app.post("/", function (req, res) {
    let title = req.body.titleName;
    let content = req.body.contents;
    if (req.body.composeButton === "composes") {
        titleArray.push(title);
        contentArray.push(content);
        res.redirect("/");
    }
    else {
        let page = req.body.btn;
        pageNum = pageFinder(page);
        res.redirect("/page");

    }

})





app.listen(port, function () {
    console.log("Listening on port 3000");
})
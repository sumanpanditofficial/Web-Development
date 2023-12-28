const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/fruitsDB", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error); 
  });
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
  name: "Apple",
  rating: 6,
  review: "Its kinda solid in nature",
});

const kiwi = new Fruit({
  name: "kiwi",
  rating: 0,
  review: "have not tasted it yet",
});

const orange = new Fruit({
  name: "orange",
  rating: 5,
  review: "only in winter",
});

const banana = new Fruit({
  name: "banana",
  rating: 8,
  review: "MaLbo is the best",
});

const litchi = new Fruit({
  name: "litchi",
  rating: 5,
  review: "Its very juicy",
});

// litchi.save();

// Fruit.insertMany([apple, kiwi, orange, banana]);

function fetchFruitNames() {
  Fruit.find({}, "name")
    .then((Fruits) => {
      const fruitNames = Fruits.map((Fruit) => Fruit.name);
      console.log(fruitNames);
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchFruitNames();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "suman",
  age: 21,
});

// person.save();

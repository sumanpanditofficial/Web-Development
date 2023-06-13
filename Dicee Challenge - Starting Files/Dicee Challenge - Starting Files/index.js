var diceResult2;
var diceResult1;
var images;

function DiceResults() {
    diceResult1 = Math.random(); 
    diceResult2 = Math.random();
    diceResult1 = (diceResult1 * 6) + 1;
    diceResult2 = (diceResult2 * 6) + 1;
    diceResult1 = Math.floor(diceResult1);
    diceResult2 = Math.floor(diceResult2);
}

function rollDice1() {
    var diceImage1 = document.getElementById("img1");
    diceImage1.src = images[diceResult1 - 1];
}

function rollDice2() {
    var diceImage2 = document.getElementById("img2");
    diceImage2.src = images[diceResult2 - 1];
}

function animateButton() {
    var button = document.getElementById("myButton");
    button.classList.add("animated");

    setTimeout(function () {
        button.classList.remove("animated");
    }, 1000);
}

function winner(){
    if ((diceResult1 >diceResult2)){
        document.querySelector("h1").textContent = "Alpha Won!";
    }
    else if(diceResult2>diceResult1){
        document.querySelector("h1").textContent="Omega Won!";
    }
    else{
        document.querySelector("h1").textContent="Stalemate! No winner!";
    }
}

function handleClick() {
    images = [
        "images/dice1.png",
        "images/dice2.png",
        "images/dice3.png",
        "images/dice4.png",
        "images/dice5.png",
        "images/dice6.png"
    ];
    DiceResults();
    winner();
    animateButton();
    rollDice1();
    rollDice2();
}

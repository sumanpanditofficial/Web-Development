var nextButton;
var Array1 = [];
var Array2 = [];

function greenAudio() {
  var playAudio = new Audio("sounds/green.mp3");
  playAudio.play();

}

function redAudio() {
  var playAudio = new Audio("sounds/red.mp3");
  playAudio.play();
}

function yellowAudio() {
  var playAudio = new Audio("sounds/yellow.mp3");
  playAudio.play();
}

function blueAudio() {
  var playAudio = new Audio("sounds/blue.mp3");
  playAudio.play();
}


function generatePattern() {
  nextButton = Math.random();
  nextButton = (nextButton * 4) + 1;
  nextButton = Math.floor(nextButton);
}

function buttonBlinker() {
  generatePattern();
  if (nextButton === 1) {
    greenAudio();
    triggerAnimation("green");

  }
  else if (nextButton === 2) {
    redAudio();
    triggerAnimation("red");

  }
  else if (nextButton === 3) {
    yellowAudio();
    triggerAnimation("yellow");

  }
  else if (nextButton === 4) {
    blueAudio();
    triggerAnimation("blue");

  }
  Array1.push(nextButton);
}

function playGame(){
  


}




















































function triggerAnimation(buttonId) {
  var button = document.getElementById(buttonId);

  if (button) {
    button.classList.add('clicked');

    setTimeout(function () {
      button.classList.remove('clicked');
    }, 500);
  }
}





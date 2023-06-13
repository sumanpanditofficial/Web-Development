for (var i = 0; i < document.querySelectorAll("button").length; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function () {
        var buttonPressed = this.innerHTML;
        playAudio(buttonPressed);
        animationToButton(buttonPressed);
    });
}

document.addEventListener("keydown", function (event) {
    playAudio(event.key);
    animationToButton(event.key);
});

function playAudio(key) {
    var keywords = key;
    switch (keywords) {
        case "w":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        case "a":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
        case "s":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "d":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "j":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case "k":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        case "l":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;




    }
}

function animationToButton(key) {
    var btnPressed = document.querySelector("." + key);
    btnPressed.classList.add("pressed");
    setTimeout(function() {
      btnPressed.classList.remove("pressed");
    }, 200); // 500 milliseconds = 0.5 seconds
  }
  
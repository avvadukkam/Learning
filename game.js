
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userChosenPattern = [];

var started = false;
var level = 0;

$(document).on("tap",function() {
    if(!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});


$(document).on("keypress",function() {
    if(!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userChosenPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userChosenPattern.length-1);
});

function checkAnswer(currentLevel) {
    
    if(gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
        if(userChosenPattern.length === gamePattern.length) { 
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userChosenPattern = [];
    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

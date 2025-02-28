// game variables
let boxes = document.querySelectorAll(".box");
let turn = "X";
let gameOver = false;
const results = document.querySelector("#results");
const playAgain =document.querySelector("#play-again")
const bg = document.querySelector(".bg");

// player data
let playerX = "";
let playerO = "";
let scores = {X: 0 , O: 0};
let startGame = document.querySelector("#start-game");

// patterns to win on the board
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

startGame.addEventListener("click", function () {
    // set the players name
    playerX = document.querySelector("#playerX").value || "Player X";
    playerO = document.querySelector("#playerO").value || "Player O";

    // show the game board
    document.querySelector("#player-setup").style.display = "none";
    document.querySelector("#game-board").style.display = "grid";

    // put the players names on the score board
    document.querySelector("#playerX-name").innerText = playerX;
    document.querySelector("#playerO-name").innerText = playerO;
});

// if the user cliick enter it will start the game
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        startGame.click();
    }
});

// for each box add listener on click to check wining, draw and change turnS
boxes.forEach(e => {
    e.innerHTML = ""
    e.addEventListener("click", function() {
        if(!gameOver && e.innerHTML == "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();

            if(!gameOver) { changeTurn(); }
        }
    })
})

// change turn function, also change the mark on the player symbole
function changeTurn() {
    turn = (turn === "X") ? "O" : "X";
    bg.style.left = (turn === "X") ? "0" : "85px";
}

// check if there is a winner
function checkWin() {
    winPatterns.forEach(pattern => {
        // if there is a player with one pattern, game over
        let [a, b, c] = pattern;
        if (
            boxes[a].innerHTML &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML
        ) {
            // set game over
            gameOver = true;

            // change the background of the wining boxes
            boxes[a].style.backgroundColor = "#007d69";
            boxes[b].style.backgroundColor = "#007d69";
            boxes[c].style.backgroundColor = "#007d69";

            // show play again btn
            playAgain.style.display = "inline";

            // change the color of the wining symbole bg and cahnge the score
            if (turn === "X") {
                bg.style.left = "0";
                scores.X += 1;
            } else {
                bg.style.left = "85px";
                scores.O += 1;
            }
            bg.style.backgroundColor = "#007d69";

            // update the score board
            updateScore();
        }
    });
}

// update the score boxs
function updateScore() {
    document.querySelector("#scoreX").innerText = scores.X;
    document.querySelector("#scoreO").innerText = scores.O;
}

// check if there is a draw
function checkDraw() {
    // if there is a tie
    if (![...boxes].some(box => box.innerHTML === "") && !gameOver) {
        // set game over and print msg
        gameOver = true;
        results.innerText = "It's a Draw!";

        // draw all the boxes
        boxes.forEach(box => (box.style.backgroundColor = "#69007d"));

        // show play again btn
        playAgain.style.display = "inline";
    }
}

// listener to play again btn, on click
playAgain.addEventListener("click", () => {
    
    // reset the game

    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
    });

    results.innerText = "";
    gameOver = false;
    
    // if the O wins he will start
    turn = (turn === "X") ? "X" : "O";
    bg.style.left = (turn === "X") ? "0" : "85px";
    bg.style.backgroundColor = "#69007d";

    document.getElementById("play-again").style.display = "none";
});

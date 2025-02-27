let boxes = document.querySelectorAll(".box");
let turn = "X";
let gameOver = false;
const results = document.querySelector("#results");
const playAgain =document.querySelector("#play-again")
const bg = document.querySelector(".bg");

const winPatterns = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

// for each box add listener on click to check wining, draw and change turnS
boxes.forEach(e => {
    e.innerHTML = ""
    e.addEventListener("click", function(){
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
    if (turn === "X") {
        turn = "O";
        bg.style.left = "85px"
    } else {
        turn = "X";
        bg.style.left = "0"
    }
}

// check if there is a winner
function checkWin() {
    winPatterns.forEach(pattern => {
        // if there is a player with one pattern, it means he won
        let [a, b, c] = pattern;
        if (
            boxes[a].innerHTML &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML
        ) {
            // set game over and print the msg
            gameOver = true;
            results.innerText = turn + " wins!";

            // change the background of the wining boxes
            boxes[a].style.backgroundColor = "#007d69";
            boxes[b].style.backgroundColor = "#007d69";
            boxes[c].style.backgroundColor = "#007d69";

            // show play again btn
            playAgain.style.display = "inline";

            // change the color of the wining symbole bg
            if (turn === "X") {
                bg.style.left = "0";
            } else {
                bg.style.left = "85px";
            }
            bg.style.backgroundColor = "#007d69";
        }
    });
}

// check if there is a draw
function checkDraw() {
    // if there is a tie
    if (![...boxes].some(box => box.innerHTML === "") && !gameOver) {
        // set game over and print msg
        gameOver = true;
        results.innerText = "It's a Draw! 🤝";

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
    turn = "X";

    document.getElementById("play-again").style.display = "none";

    document.querySelector(".bg").style.left = "0";

    bg.style.backgroundColor = "#69007d";
});

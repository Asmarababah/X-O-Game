let gridItem = document.getElementsByClassName("square");
let currentTurn = "X";
let gameIsFinished = false;

let boardArray = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8",
]
for (const item of gridItem) {
    item.addEventListener("click", () => {
        if (gameIsFinished) {
            return
        }

        let value = item.getAttribute("value");
        let index = value - 1;

        if (boardArray[index] == "X" || boardArray[index] == "O") {
            return
        }

        //filling the value visually
        let squareContent = document.querySelector(`.square[value="${value}"]`)
        squareContent.innerHTML = currentTurn;

        //filling the value logically
        boardArray[index] = currentTurn;
        console.log(boardArray)

        if (currentTurn == "X") {
            currentTurn = "O"
        } else {
            currentTurn = "X"
        }

        document.getElementById("instruction").textContent = `${currentTurn.toUpperCase()} turn`;
        evaluateBoard()

    })
}
function evaluateBoard() {
    console.log(boardArray[0], boardArray[1], boardArray[2], boardArray[0] === boardArray[1] === boardArray[2])
    if (
        // rows
        (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) ||
        (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) ||
        (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]) ||

        // cols
        (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
        (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
        (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) ||

        // Diagonal
        (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]) ||
        (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8])
    ) {
        var winner = currentTurn == "O" ? "X" : "O"
        alert(`${winner} Won!`);
        gameIsFinished = true;
        return
    }

    //حالة التعادل

    let isDrow = true;
    for (const square of boardArray) {
        if (square != "X" && square != "O") {
            isDrow = false;
            break
        }
    }
    if (isDrow) {
        gameIsFinished = true;
        alert("Drow");
    }

}

document.getElementById("reset-btn").addEventListener("click", () => {
    reset();
})

function reset() {
    for (item of gridItem) {
        let value = item.getAttribute("value");
        let squareContent = document.querySelector(`.square[value="${value}"]`)
        squareContent.innerHTML = ""


        boardArray = [
            "0", "1", "2",
            "3", "4", "5",
            "6", "7", "8",
        ]


    }

    gameIsFinished = false;
    currentTurn = "X";
    document.getElementById("instruction").textContent = `${currentTurn} turn`;

}
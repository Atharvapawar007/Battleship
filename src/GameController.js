function GameController(player1, player2) {
    let currentPlayer = player1;

    function shiftTurn() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function playRound(cell) {
        currentPlayer.playMove(cell);
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    return {
        getCurrentPlayer,
        playRound,
        shiftTurn,
    };
}

export default GameController;

function Player(name) {
    let gameBoard = null;

    function assignBoard(board) {
        gameBoard = board;
    }

    function playMove(cell) {
        gameBoard.receiveAttack(cell);
    }

    function getBoardCopy() {
        return gameBoard.getBoard();
    }

    function hasWon() {
        return gameBoard.allShipsSunk();
    }

    return {
        get name() {
            return name;
        },
        assignBoard,
        playMove,
        getBoardCopy,
        hasWon,
    };
}

export default Player;

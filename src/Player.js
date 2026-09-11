function Player(name) {
    let gameBoard = null;

    function getName() {
        return name;
    }

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
        getName,
        assignBoard,
        playMove,
        getBoardCopy,
        hasWon
    };
}

export default Player;

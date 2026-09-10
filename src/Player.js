// const ships = {
//     battleship : 5,
//     destroyer : 4,
//     crusader : 3,
//     submarine : 2,
//     lifeboat : 1
// }

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

    return {
        getName,
        assignBoard,
        playMove,
    };
}

export default Player;

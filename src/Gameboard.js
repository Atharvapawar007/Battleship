function Gameboard() {
    //board simulator
    const board = [];
    //create board
    for(let i = 0; i < 10; i++){
        const row = [];
        for(let j = 0; j < 10; j++){
            row.push(0);
        }

        board.push(row);
    }

    //ships
    const ships = [];

    function placeShip(ship, start, orientation){
        const length = ship.length;
        const [x, y] = start;

        if(orientation === "horizontal"){
            for(let j = y; j < y + length; j++){
                board[x][j] = 1;
            }
        }else{
            for(let i = x; i < x + length; i++){
                board[i][y] = 1;
            }
        }

        ships.push(ship);
    }

    return {
        get ships(){
            return ships;
        },
        placeShip
    }
}

export default Gameboard;

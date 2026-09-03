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

    //map to trace from coordinates to a ship
    const map = new Map();

    function placeShip(ship, start, orientation){
        const length = ship.length;
        const [x, y] = start;

        if(orientation === "horizontal"){
            for(let j = y; j < y + length; j++){
                board[x][j] = 1;
                map.set(`${[x, j]}`, ship);
                ship.addCoordinates([x, j]);
            }
        }else{
            for(let i = x; i < x + length; i++){
                board[i][y] = 1;
                map.set(`${[i, y]}`, ship);
                ship.addCoordinates([i, y]);
            }
        }

        ships.push(ship);

    }

    function allShipsSunk(){
        for(const ship of ships){
            if(!ship.isSunk()){
                return false;
            }
        }
        return true;
    }

    return {
        get ships(){
            return ships;
        },
        placeShip,
        allShipsSunk
    }
}

export default Gameboard;

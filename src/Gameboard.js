import Ship from "./Ship";

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

    //missedAttacks array to keep track of attacks over empty cells
    const missedAttacks = [];

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

    function receiveAttack(cell){
        const ship = map.get(`${cell}`);
        const [x, y] = cell;
        if(ship === undefined){
            missedAttacks.push(cell);
            board[x][y] = -1;
        }else if(board[x][y] === 1){
            ship.hit();
            board[x][y] = 2;
        }
    }

    return {
        get ships(){
            return ships;
        },
        get missedAttacks(){
            return missedAttacks;
        },
        placeShip,
        allShipsSunk,
        receiveAttack
    }
}

export default Gameboard;

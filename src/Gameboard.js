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

        if(!isValidPlacement(length, start, orientation)){
            throw new Error("cannot place ship outside of board");
        }

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

    function isValidPlacement(length, start, orientation){
        const [x, y] = start;

        if(orientation === "horizontal"){
            for(let j = y; j < y + length; j++){
                if(!insideBoard(x, j) || board[x][j] === 1){
                    return false;
                }
            }
        }else{
            for(let i = x; i < x + length; i++){
                if(!insideBoard(i, y) || board[i][y] === 1){
                    return false;
                }
            }
        }

        return true;
    }

    function insideBoard(i, j){
        if(i < 0 || i >= 10) return false;
        if(j < 0 || j >= 10) return false;

        return true;
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

        if(!insideBoard(x, y)){
            throw new Error("Cannot place an attack out of the board")
        }
        
        if(ship === undefined && board[x][y] === 0){
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

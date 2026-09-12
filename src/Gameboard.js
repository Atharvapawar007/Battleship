import Ship from "./Ship.js";

function Gameboard() {
    //board simulator
    const board = [];
    //create board
    for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 10; j++) {
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

    function placeShip(length, start, orientation) {
        isValidPlacement(length, start, orientation);

        const ship = Ship(length);
        const [x, y] = start;

        if (orientation === "horizontal") {
            for (let j = y; j < y + length; j++) {
                board[x][j] = 1;
                map.set(`${[x, j]}`, ship);
                ship.addCoordinates([x, j]);
            }
        } else {
            for (let i = x; i < x + length; i++) {
                board[i][y] = 1;
                map.set(`${[i, y]}`, ship);
                ship.addCoordinates([i, y]);
            }
        }

        ships.push(ship);
        return ship;
    }

    function isValidPlacement(length, start, orientation) {
        const [x, y] = start;

        if (orientation === "horizontal") {
            for (let j = y; j < y + length; j++) {
                if (!isInsideBoard(x, j)) {
                    throw new Error("Invalid placement: Ship is out of bounds");
                }

                if (board[x][j] === 1) {
                    throw new Error("Invalid placement: Ship is overlapping another ship");
                }
            }
        } else {
            for (let i = x; i < x + length; i++) {
                if (!isInsideBoard(i, y)) {
                    throw new Error("Invalid placement: Ship is out of bounds");
                }

                if (board[i][y] === 1) {
                    throw new Error("Invalid placement: Ship is overlapping another ship");
                }
            }
        }

        return true;
    }

    function isInsideBoard(i, j) {
        if (i < 0 || i >= 10) return false;
        if (j < 0 || j >= 10) return false;

        return true;
    }

    function allShipsSunk() {
        for (const ship of ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    function receiveAttack(cell) {
        const [x, y] = cell;

        if (!isInsideBoard(x, y)) {
            throw new Error(`Invalid attack: [${x}, ${y}] is outside the gameboard.`);
        }

        if (board[x][y] === -1 || board[x][y] === 2) {
            throw new Error(`Invalid attack: [${x}, ${y}] has already been attacked.`);
        }

        const ship = map.get(`${cell}`);

        if (ship === undefined) {
            missedAttacks.push(cell);
            board[x][y] = -1;
            return;
        }

        ship.hit();
        board[x][y] = 2;
    }

    function getBoard() {
        return structuredClone(board);
    }

    return {
        get ships() {
            return ships;
        },
        get missedAttacks() {
            return missedAttacks;
        },
        placeShip,
        allShipsSunk,
        receiveAttack,
        getBoard,
    };
}

export default Gameboard;

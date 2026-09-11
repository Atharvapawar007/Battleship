import GameController from "./GameController.js";
import Gameboard from "./Gameboard.js";
import Player from "./Player.js";

function DisplayController() {
    // ============================================================
    // DOM ELEMENTS
    // ============================================================

    const shipPlacementModal = document.querySelector("#battleship-details-modal");
    const playerCreationModal = document.querySelector("#start-modal");
    const playerCreationForm = document.querySelector("#start-modal form");
    const shipCreationForm = document.querySelector("#battleship-details-modal form");
    const cellsG1 = document.querySelectorAll("#gameboard1 .cell");
    const cellsG2 = document.querySelectorAll("#gameboard2 .cell");
    const currentPlayerName = document.querySelector("#current-player");

    // ============================================================
    // GAME STATE
    // ============================================================

    const gameboard1 = Gameboard();
    const gameboard2 = Gameboard();

    let player1 = null;
    let player2 = null;

    let gameController = null;
    let currentPlayer = null;
    let currentPlacementPlayer = null;
    let currentShipIndex = 0;

    // ============================================================
    // EVENT LISTENERS
    // ============================================================

    playerCreationForm.addEventListener("submit", handlePlayerCreation);
    shipCreationForm.addEventListener("submit", handleShipPlacement);

    // ============================================================
    // PLAYER CREATION
    // ============================================================

    function handlePlayerCreation(event) {
        event.preventDefault();

        const player1Name = document.querySelector("#player1-name").value;
        const player2Name = document.querySelector("#player2-name").value;

        player1 = Player(player1Name);
        player2 = Player(player2Name);

        gameController = GameController(player1, player2);
        playerCreationModal.close();
        placeShips(player1);
    }

    // ============================================================
    // SHIP PLACEMENT
    // ============================================================

    function placeShips(player) {
        currentPlacementPlayer = player;
        currentShipIndex = 0;

        showCurrentShip();
    }

    function showCurrentShip() {
        const ships = getShips();
        const shipList = Object.entries(ships);

        const [shipName, length] = shipList[currentShipIndex];

        showShipDetails(currentPlacementPlayer, shipName, length);
    }

    // Display information about the ship currently
    // being placed.
    function showShipDetails(player, shipName, length) {
        shipPlacementModal.showModal();

        const playerName = document.querySelector("#entry-player-name");

        const shipNameInput = document.querySelector("#ship-name");

        const shipLengthInput = document.querySelector("#ship-length");

        playerName.textContent = player.name;

        shipNameInput.value = shipName;

        shipLengthInput.value = length;
    }

    // Read the values entered into the ship-placement form.
    function getShipDetails() {
        const length = document.querySelector("#ship-length").value;

        const xCoordinate = document.querySelector("#ship-start-x").value;

        const yCoordinate = document.querySelector("#ship-start-y").value;

        const orientation = document.querySelector('input[name="orientation"]:checked').value;

        return {
            length: Number(length),
            coordinates: [Number(xCoordinate), Number(yCoordinate)],
            orientation: orientation,
        };
    }

    async function handleShipPlacement(event) {
        event.preventDefault();

        const ships = getShips();
        const shipList = Object.entries(ships);

        const shipDetails = getShipDetails();
        const gameboard = getOpponentGameboard(currentPlacementPlayer);

        try {
            const ship = gameboard.placeShip(
                shipDetails.length,
                shipDetails.coordinates,
                shipDetails.orientation,
            );

            shipPlacementModal.close();

            await flashShip(ship, currentPlacementPlayer);

            currentShipIndex++;

            if (currentShipIndex < shipList.length) {
                showCurrentShip();
            } else {
                finishShipPlacement(currentPlacementPlayer);
            }
        } catch (e) {
            showError(e.message);
        }
    }

    // List of ships and their lengths.
    function getShips() {
        return {
            aircraftCarrier: 5,
            battleship: 4,
            cruiser: 3,
            submarine: 3,
            destroyer: 2,
        };
    }


    // After a player has placed all of their ships,
    // either start the second player's placement phase
    // or start the actual game.
    function finishShipPlacement(player) {
        shipPlacementModal.close();

        if (player === player1) {
            placeShips(player2);
        } else {
            initGame();
        }
    }

    // Flash the cells occupied by a newly placed ship.
    // Returns a Promise so that the caller can await
    // the completion of the 2-second flashing period.
    function flashShip(ship, player) {
        const cells = getOpponentFrontendCells(player);

        const requiredCells = findCells(cells, ship.coordinates);

        // Temporarily show the ship.
        requiredCells.forEach((cell) => {
            if (cell) {
                cell.classList.add("ship");
            }
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                // Remove the temporary ship display.
                requiredCells.forEach((cell) => {
                    if (cell) {
                        cell.classList.remove("ship");
                    }
                });

                resolve();
            }, 2000);
        });
    }

    // Find all frontend cells corresponding to
    // the coordinates occupied by a ship.
    function findCells(cells, coordinates) {
        const requiredCells = [];

        for (const coordinate of coordinates) {
            requiredCells.push(findCell(cells, coordinate));
        }

        return requiredCells;
    }

    // Find one frontend cell using its row and column.
    function findCell(cells, [x, y]) {
        return [...cells].find(
            (cell) => Number(cell.dataset.row) === x && Number(cell.dataset.column) === y,
        );
    }

    // ============================================================
    // GAMEBOARD / FRONTEND MAPPING
    // ============================================================

    // Get the board belonging to the opponent.
    // During ship placement, a player places ships on
    // the opponent's board from the current player's
    // perspective.
    function getOpponentGameboard(player) {
        return player === player1 ? gameboard2 : gameboard1;
    }

    // Get the frontend cells belonging to a player.
    function getFrontendCells(player) {
        return player === player1 ? cellsG1 : cellsG2;
    }

    // Get the frontend cells of the opponent.
    function getOpponentFrontendCells(player) {
        return player === player1 ? cellsG2 : cellsG1;
    }

    // ============================================================
    // ERROR HANDLING
    // ============================================================

    function showError(errorMessage) {
        const errorModal = document.querySelector("#error-modal");

        const errorMessageField = document.querySelector("#error-modal p");

        errorModal.showModal();

        errorMessageField.textContent = errorMessage;

        // Automatically close the error message
        // after five seconds.
        setTimeout(() => {
            errorModal.close();
        }, 5000);
    }

    // ============================================================
    // GAME INITIALIZATION
    // ============================================================

    function initGame() {
        // Determine whose turn it is before
        // the first move.
        updateCurrentPlayer();
        assignGameboards();
        attachCellEventListeners();
    }

    // Attach a click handler to every cell on both boards.
    function attachCellEventListeners() {
        cellsG1.forEach((cell) => {
            cell.addEventListener("click", () => {
                handlePlayRound(cell, player1);
            });
        });

        cellsG2.forEach((cell) => {
            cell.addEventListener("click", () => {
                handlePlayRound(cell, player2);
            });
        });
    }

    function assignGameboards() {
        player1.assignBoard(gameboard1);
        player2.assignBoard(gameboard2);
    }

    // ============================================================
    // GAMEPLAY
    // ============================================================

    function handlePlayRound(cell, player) {
        const x = Number(cell.dataset.row);
        const y = Number(cell.dataset.column);

        try {
            // Tell the game controller that the current
            // player is attempting to attack this coordinate.
            gameController.playRound([x, y]);

            // Get the updated board state and display it
            // on the corresponding frontend board.
            const boardCopy = player.getBoardCopy();

            const cells = getFrontendCells(player);

            renderFrontendBoard(cells, boardCopy);

            // Check whether the current player has won.
            if (currentPlayer.hasWon()) {
                setTimeout(() => {
                    declareWinner();
                }, 5000);
            } else {
                // If nobody has won, switch to the other player.
                gameController.shiftTurn();

                updateCurrentPlayer();
            }
        } catch (e) {
            showError(e.message);
        }
    }

    // Render the current state of a player's board
    // onto the frontend.
    function renderFrontendBoard(cells, boardCopy) {
        cells.forEach((cell) => {
            const x = Number(cell.dataset.row);
            const y = Number(cell.dataset.column);

            const status = boardCopy[x][y];

            if (status === 2) {
                cell.classList.add("hit");
            } else if (status === -1) {
                cell.classList.add("miss");
            }
        });
    }

    // Update the variable and UI to reflect
    // whose turn it currently is.
    function updateCurrentPlayer() {
        currentPlayer = gameController.getCurrentPlayer();
        currentPlayerName.textContent = currentPlayer.getName();
    }

    // ============================================================
    // WINNER
    // ============================================================

    function declareWinner() {
        const winnerModal = document.querySelector("#winner-modal");

        const winnerMessageField = document.querySelector("#error-modal p");

        winnerModal.showModal();

        winnerMessageField.textContent = `${currentPlayer.getName()}`;
    }

    // ============================================================
    // PUBLIC API
    // ============================================================

    function startGame() {
        playerCreationModal.show();
    }

    // Only expose functions that need to be called
    // from outside the DisplayController.
    return {
        startGame,
    };
}

export default DisplayController;

import GameController from "./GameController.js";
import Gameboard from "./Gameboard.js";
import Player from "./Player.js";

function DisplayController() {
    const shipPlacementModal = document.querySelector("#battleship-details-modal");
    const playerCreationModal = document.querySelector("#start-modal");
    const playerCreationForm = document.querySelector("#start-modal form");
    const shipCreationForm = document.querySelector("#battleship-details-modal form");

    const cellsG1 = document.querySelectorAll("#gameboard1 .cell");
    const cellsG2 = document.querySelectorAll("#gameboard2 .cell");

    const gameboard1 = Gameboard();
    const gameboard2 = Gameboard();

    let player1 = null;
    let player2 = null;
    let gameController = null;

    let currentPlayer = null;
    const currentPlayerName = document.querySelector("#current-player");

    playerCreationForm.addEventListener("submit", handlePlayerCreation);

    function handlePlayerCreation(event) {
        event.preventDefault();
        playerCreationModal.close();

        const player1Name = document.querySelector("#player1-name").value;
        const player2Name = document.querySelector("#player2-name").value;

        player1 = Player(player1Name);
        player2 = Player(player2Name);

        gameController = GameController(player1, player2);

        placeShips(player1);
    }

    function placeShips(player) {
        shipCreationForm.addEventListener("submit", handleShipPlacement);
        const ships = getShips();

        const shipList = Object.entries(ships);
        let currentShipIndex = 0;

        showCurrentShip();

        function showCurrentShip() {
            const [shipName, length] = shipList[currentShipIndex];

            showShipDetails(player, shipName, length);
        }

        function handleShipPlacement(event) {
            event.preventDefault();

            const shipDetails = getShipDetails();
            const gameboard = getOpponentGameboard(player);

            try {
                gameboard.placeShip(
                    shipDetails.length,
                    shipDetails.coordinates,
                    shipDetails.orientation,
                );

                shipPlacementModal.close();
                currentShipIndex++;

                if (currentShipIndex < shipList.length) {
                    showCurrentShip();
                } else {
                    finishShipPlacement(player);
                }
            } catch (e) {
                showError(e.message);
            }
        }
    }

    function getShips() {
        return {
            aircraftCarrier: 5,
            battleship: 4,
            cruiser: 3,
            submarine: 3,
            destroyer: 2,
        };
    }

    function showShipDetails(player, shipName, length) {
        shipPlacementModal.showModal();

        const playerName = document.querySelector("#entry-player-name");
        const shipNameInput = document.querySelector("#ship-name");
        const shipLengthInput = document.querySelector("#ship-length");

        playerName.textContent = player.name;
        shipNameInput.value = shipName;
        shipLengthInput.value = length;
    }

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

    function getOpponentGameboard(player) {
        return player === player1 ? gameboard2 : gameboard1;
    }

    function getFrontendCells(player) {
        return player === player1 ? cellsG1 : cellsG2;
    }

    function finishShipPlacement(player) {
        shipPlacementModal.close();

        if (player === player1) {
            placeShips(player2);
        } else {
            initGame();
        }
    }

    function showError(errorMessage) {
        const errorModal = document.querySelector("#error-modal");
        errorModal.showModal();

        const errorMessageField = document.querySelector("#error-modal p");
        errorMessageField.textContent = errorMessage;

        setTimeout(() => {
            errorModal.close();
        }, 5000);
    }

    function assignGameboards() {
        player1.assignBoard(gameboard1);
        player2.assignBoard(gameboard2);
    }

    function initGame() {
        assignGameboards();
        attachCellEventListeners();
    }

    function attachCellEventListeners() {
        cellsG1.forEach((cell) => handlePlayRound(cell, player1));
        cellsG2.forEach((cell) => handlePlayRound(cell, player2));
    }

    function handlePlayRound(cell, player) {
        const x = Number(cell.dataset.row);
        const y = Number(cell.dataset.column);

        try {
            gameController.playRound([x, y]);
            const boardCopy = player.getBoardCopy();
            const cells = getFrontendCells(player);

            renderFrontendBoard(cells, boardCopy);

            if (currentPlayer.hasWon()) {
                setTimeout(() => {
                    declareWinner();
                }, 5000);
            } else {
                gameController.switchTurn();
                updateCurrentPlayer();
            }
        } catch (e) {
            showError(e.message);
        }
    }

    function renderFrontendBoard(cells, boardCopy) {
        cells.forEach(cell => {
            const x = Number(cell.dataset.row);
            const y = Number(cell.dataset.column);
            const status = boardCopy[x][y];

            if (status === 2) {
                cell.classList.add('hit');
            } else if (status === -1) {
                cell.classList.add('miss');
            }
        })
    }

    function updateCurrentPlayer() {
        currentPlayer = gameController.getCurrentPlayer();
        currentPlayerName.textContent = currentPlayer.getName();
    }

    function declareWinner() {
        const winnerModal = document.querySelector("#winner-modal");
        winnerModal.showModal();

        const winnerMessageField = document.querySelector("#error-modal p");
        winnerMessageField.textContent = `${currentPlayer.getName()}`;
    }

    function startGame() {
        playerCreationModal.show();
    }

    return {
        startGame
    }
}

export default DisplayController;

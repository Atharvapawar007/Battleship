import GameController from "./GameController";
import Gameboard from "./Gameboard";
import Player from "./Player";

function DisplayController() {
    const playerCreationForm = document.querySelector("#start-modal form");

    const gameboard1Frontend = document.querySelector("#gameboard1");
    const gameboard2Frontend = document.querySelector("#gameboard2");

    const gameboard1Backend = Gameboard();
    const gameboard2Backend = Gameboard();

    let player1 = null;
    let player2 = null;
    let gameController = null;

    playerCreationForm.addEventListener("submit", handlePlayerCreation);

    function handlePlayerCreation(event) {
        event.preventDefault();

        const player1Name = document.querySelector("#player1-name").value;
        const player2Name = document.querySelector("#player2-name").value;

        player1 = Player(player1Name);
        player2 = Player(player2Name);

        gameController = GameController(player1, player2);

        placeShips(player1);
    }

    function placeShips(player) {
        const opponentBoard = getOpponentBoard(player);

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
            const gameboard = getPlayerGameboard(player);

            try {
                gameboard.placeShip(
                    shipDetails.length,
                    shipDetails.coordinates,
                    shipDetails.orientation
                );

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

        const shipCreationForm = document.querySelector(
            "#battleship-details-modal form"
        );

        shipCreationForm.addEventListener(
            "submit",
            handleShipPlacement,
            { once: true }
        );
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
        const modal = document.querySelector("#battleship-details-modal");
        const playerName = document.querySelector("#entry-player-name");
        const shipNameInput = document.querySelector("#ship-name");
        const shipLengthInput = document.querySelector("#ship-length");

        playerName.textContent = player.name;
        shipNameInput.value = shipName;
        shipLengthInput.value = length;

        modal.showModal();
    }

    function getShipDetails() {
        const length = document.querySelector("#ship-length").value;

        const xCoordinate = document.querySelector("#ship-start-x").value;

        const yCoordinate = document.querySelector("#ship-start-y").value;

        const orientation = document.querySelector(
            'input[name="orientation"]:checked'
        ).value;

        return {
            length: Number(length),
            coordinates: [
                Number(xCoordinate),
                Number(yCoordinate)
            ],
            orientation: orientation
        };
    }

    function getPlayerGameboard(player) {
        return player === player1
            ? gameboard1Backend
            : gameboard2Backend;
    }

    function getFrontendBoard(player) {
        return player === player1
            ? gameboard1Frontend
            : gameboard2Frontend;
    }

    function getOpponentBoard(player) {
        return player === player1
            ? gameboard2Frontend
            : gameboard1Frontend;
    }

    function finishShipPlacement(player) {
        const modal = document.querySelector("#battleship-details-modal");

        modal.close();

        if (player === player1) {
            placeShips(player2);
        } else {
            initGame();
        }
    }

    function showError(errorMessage) {
        const errorModal = document.querySelector('#error-modal');
        errorModal.showModal();

        const errorMessageField = document.querySelector('#error-modal p');
        errorMessageField.textContent = errorMessage;

        setTimeout(() => {
            errorModal.close();
        }, 5000);
    }

    function assignGameboards() {
        player1.assignBoard(gameboard2Backend);
        player2.assignBoard(gameboard1Backend);
    }

    function initGame() {
        assignGameboards();
        attachCellEventListeners();
    }
}

export default DisplayController;

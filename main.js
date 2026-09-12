/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DisplayController.js"
/*!**********************************!*\
  !*** ./src/DisplayController.js ***!
  \**********************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameController.js */ \"./src/GameController.js\");\n/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard.js */ \"./src/Gameboard.js\");\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player.js */ \"./src/Player.js\");\n\n\n\n\nfunction DisplayController() {\n    // ============================================================\n    // DOM ELEMENTS\n    // ============================================================\n\n    const shipPlacementModal = document.querySelector(\"#battleship-details-modal\");\n    const playerCreationModal = document.querySelector(\"#start-modal\");\n    const playerCreationForm = document.querySelector(\"#start-modal form\");\n    const shipCreationForm = document.querySelector(\"#battleship-details-modal form\");\n    const cellsG1 = document.querySelectorAll(\"#gameboard1 .cell\");\n    const cellsG2 = document.querySelectorAll(\"#gameboard2 .cell\");\n    const currentPlayerName = document.querySelector(\"#current-player\");\n    const entryPlayerName = document.querySelector(\"#entry-player-name\");\n\n    // ============================================================\n    // GAME STATE\n    // ============================================================\n\n    const gameboard1 = (0,_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    const gameboard2 = (0,_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n    let player1 = null;\n    let player2 = null;\n\n    let gameController = null;\n    let currentPlayer = null;\n    let currentPlacementPlayer = null;\n    let currentShipIndex = 0;\n\n    // ============================================================\n    // EVENT LISTENERS\n    // ============================================================\n\n    playerCreationForm.addEventListener(\"submit\", handlePlayerCreation);\n    shipCreationForm.addEventListener(\"submit\", handleShipPlacement);\n\n    // ============================================================\n    // PLAYER CREATION\n    // ============================================================\n\n    function handlePlayerCreation(event) {\n        event.preventDefault();\n\n        const player1Name = document.querySelector(\"#player1-name\").value;\n        const player2Name = document.querySelector(\"#player2-name\").value;\n\n        player1 = (0,_Player_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(player1Name);\n        player2 = (0,_Player_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(player2Name);\n\n        gameController = (0,_GameController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(player1, player2);\n        playerCreationModal.close();\n\n        const player1DisplayName = document.querySelector(\"#player1-display-name\");\n        const player2DisplayName = document.querySelector(\"#player2-display-name\");\n\n        player1DisplayName.textContent = player2Name + \"'s fleet\";\n        player2DisplayName.textContent = player1Name + \"'s fleet\";\n\n        placeShips(player1);\n    }\n\n    // ============================================================\n    // SHIP PLACEMENT\n    // ============================================================\n\n    function placeShips(player) {\n        currentPlacementPlayer = player;\n        currentShipIndex = 0;\n        entryPlayerName.textContent = currentPlacementPlayer.name;\n        showCurrentShip();\n    }\n\n    function showCurrentShip() {\n        const ships = getShips();\n        const shipList = Object.entries(ships);\n\n        const [shipName, length] = shipList[currentShipIndex];\n\n        showShipDetails(currentPlacementPlayer, shipName, length);\n    }\n\n    // Display information about the ship currently\n    // being placed.\n    function showShipDetails(player, shipName, length) {\n        shipPlacementModal.showModal();\n\n        document.querySelector(\"#entry-player-name\").textContent = player.name;\n\n        document.querySelector(\"#ship-name\").value = shipName;\n\n        document.querySelector(\"#ship-length\").value = length;\n\n        document.querySelector(\"#ship-start-x\").value = 0;\n\n        document.querySelector(\"#ship-start-y\").value = 0;\n    }\n\n    // Read the values entered into the ship-placement form.\n    function getShipDetails() {\n        const length = document.querySelector(\"#ship-length\").value;\n\n        const xCoordinate = document.querySelector(\"#ship-start-x\").value;\n\n        const yCoordinate = document.querySelector(\"#ship-start-y\").value;\n\n        const orientation = document.querySelector('input[name=\"orientation\"]:checked').value;\n\n        return {\n            length: Number(length),\n            coordinates: [Number(xCoordinate), Number(yCoordinate)],\n            orientation: orientation,\n        };\n    }\n\n    async function handleShipPlacement(event) {\n        event.preventDefault();\n\n        const ships = getShips();\n        const shipList = Object.entries(ships);\n\n        const shipDetails = getShipDetails();\n        const gameboard = getOpponentGameboard(currentPlacementPlayer);\n\n        try {\n            const ship = gameboard.placeShip(\n                shipDetails.length,\n                shipDetails.coordinates,\n                shipDetails.orientation,\n            );\n\n            shipPlacementModal.close();\n\n            await flashShip(ship, currentPlacementPlayer);\n\n            currentShipIndex++;\n\n            if (currentShipIndex < shipList.length) {\n                showCurrentShip();\n            } else {\n                finishShipPlacement(currentPlacementPlayer);\n            }\n        } catch (e) {\n            showError(e.message);\n        }\n    }\n\n    // List of ships and their lengths.\n    function getShips() {\n        return {\n            aircraftCarrier: 5,\n            battleship: 4,\n            cruiser: 3,\n            submarine: 3,\n            destroyer: 2,\n        };\n    }\n\n    // After a player has placed all of their ships,\n    // either start the second player's placement phase\n    // or start the actual game.\n    function finishShipPlacement(player) {\n        shipPlacementModal.close();\n\n        if (player === player1) {\n            placeShips(player2);\n        } else {\n            initGame();\n        }\n    }\n\n    // Flash the cells occupied by a newly placed ship.\n    // Returns a Promise so that the caller can await\n    // the completion of the 2-second flashing period.\n    function flashShip(ship, player) {\n        const cells = getOpponentFrontendCells(player);\n\n        const requiredCells = findCells(cells, ship.coordinates);\n\n        // Temporarily show the ship.\n        requiredCells.forEach((cell) => {\n            if (cell) {\n                cell.classList.add(\"ship\");\n            }\n        });\n\n        return new Promise((resolve) => {\n            setTimeout(() => {\n                // Remove the temporary ship display.\n                requiredCells.forEach((cell) => {\n                    if (cell) {\n                        cell.classList.remove(\"ship\");\n                    }\n                });\n\n                resolve();\n            }, 2000);\n        });\n    }\n\n    // Find all frontend cells corresponding to\n    // the coordinates occupied by a ship.\n    function findCells(cells, coordinates) {\n        const requiredCells = [];\n\n        for (const coordinate of coordinates) {\n            requiredCells.push(findCell(cells, coordinate));\n        }\n\n        return requiredCells;\n    }\n\n    // Find one frontend cell using its row and column.\n    function findCell(cells, [x, y]) {\n        return [...cells].find(\n            (cell) => Number(cell.dataset.row) === x && Number(cell.dataset.column) === y,\n        );\n    }\n\n    // ============================================================\n    // GAMEBOARD / FRONTEND MAPPING\n    // ============================================================\n\n    // Get the board belonging to the opponent.\n    // During ship placement, a player places ships on\n    // the opponent's board from the current player's\n    // perspective.\n    function getOpponentGameboard(player) {\n        return player === player1 ? gameboard2 : gameboard1;\n    }\n\n    // Get the frontend cells belonging to a player.\n    function getFrontendCells(player) {\n        return player === player1 ? cellsG1 : cellsG2;\n    }\n\n    // Get the frontend cells of the opponent.\n    function getOpponentFrontendCells(player) {\n        return player === player1 ? cellsG2 : cellsG1;\n    }\n\n    // ============================================================\n    // ERROR HANDLING\n    // ============================================================\n\n    function showError(errorMessage) {\n        const errorModal = document.querySelector(\"#error-modal\");\n\n        const errorMessageField = document.querySelector(\"#error-modal p\");\n\n        errorModal.showModal();\n\n        errorMessageField.textContent = errorMessage;\n\n        // Automatically close the error message\n        // after five seconds.\n        setTimeout(() => {\n            errorModal.close();\n        }, 2000);\n    }\n\n    // ============================================================\n    // GAME INITIALIZATION\n    // ============================================================\n\n    function initGame() {\n        // Determine whose turn it is before\n        // the first move.\n        updateCurrentPlayer();\n        assignGameboards();\n        attachCellEventListeners();\n    }\n\n    // Attach a click handler to every cell on both boards.\n    function attachCellEventListeners() {\n        cellsG1.forEach((cell) => {\n            cell.addEventListener(\"click\", () => {\n                handlePlayRound(cell, player1);\n            });\n        });\n\n        cellsG2.forEach((cell) => {\n            cell.addEventListener(\"click\", () => {\n                handlePlayRound(cell, player2);\n            });\n        });\n    }\n\n    function assignGameboards() {\n        player1.assignBoard(gameboard1);\n        player2.assignBoard(gameboard2);\n    }\n\n    // ============================================================\n    // GAMEPLAY\n    // ============================================================\n\n    function handlePlayRound(cell, player) {\n        const x = Number(cell.dataset.row);\n        const y = Number(cell.dataset.column);\n\n        try {\n            // The board a cell lives on belongs to a fixed player\n            // (cellsG1 -> player1, cellsG2 -> player2, set up in\n            // attachCellEventListeners). A player may only attack\n            // from their own board.\n            if (player !== currentPlayer) {\n                showError(\"You cannot attack your own fleet\");\n                return;\n            }\n\n            // Tell the game controller that the current\n            // player is attempting to attack this coordinate.\n            gameController.playRound([x, y]);\n\n            // Get the updated board state and display it\n            // on the corresponding frontend board.\n            const boardCopy = player.getBoardCopy();\n\n            const cells = getFrontendCells(player);\n\n            renderFrontendBoard(cells, boardCopy);\n\n            // Check whether the current player has won.\n            if (currentPlayer.hasWon()) {\n                setTimeout(() => {\n                    declareWinner();\n                }, 2000);\n            } else {\n                // If nobody has won, switch to the other player.\n                gameController.shiftTurn();\n                updateCurrentPlayer();\n            }\n        } catch (e) {\n            showError(e.message);\n        }\n    }\n\n    // Render the current state of a player's board\n    // onto the frontend.\n    function renderFrontendBoard(cells, boardCopy) {\n        cells.forEach((cell) => {\n            const x = Number(cell.dataset.row);\n            const y = Number(cell.dataset.column);\n\n            const status = boardCopy[x][y];\n\n            if (status === 2) {\n                cell.classList.add(\"hit\");\n            } else if (status === -1) {\n                cell.classList.add(\"miss\");\n            }\n        });\n    }\n\n    // Update the variable and UI to reflect\n    // whose turn it currently is.\n    function updateCurrentPlayer() {\n        currentPlayer = gameController.getCurrentPlayer();\n        currentPlayerName.textContent = currentPlayer.name;\n    }\n\n    // ============================================================\n    // WINNER\n    // ============================================================\n\n    function declareWinner() {\n        const winnerModal = document.querySelector(\"#winner-modal\");\n\n        const winnerMessageField = document.querySelector(\"#winner-modal p\");\n\n        winnerModal.showModal();\n\n        winnerMessageField.textContent = `${currentPlayer.name} wins!`;\n    }\n\n    // ============================================================\n    // PUBLIC API\n    // ============================================================\n\n    function startGame() {\n        // Fixed: .show() opens a non-modal dialog with no backdrop and\n        // keeps it out of the browser's top layer, which let page content\n        // (board panels, animated pseudo-elements) paint over/through it.\n        // .showModal() is what every other dialog in this file already uses.\n        playerCreationModal.showModal();\n    }\n\n    // Only expose functions that need to be called\n    // from outside the DisplayController.\n    return {\n        startGame,\n    };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayController);\n\n\n//# sourceURL=webpack://battleship/./src/DisplayController.js?\n}");

/***/ },

/***/ "./src/GameController.js"
/*!*******************************!*\
  !*** ./src/GameController.js ***!
  \*******************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction GameController(player1, player2) {\n    let currentPlayer = player1;\n\n    function shiftTurn() {\n        if (currentPlayer === player1) {\n            currentPlayer = player2;\n        } else {\n            currentPlayer = player1;\n        }\n    }\n\n    function playRound(cell) {\n        currentPlayer.playMove(cell);\n    }\n\n    function getCurrentPlayer() {\n        return currentPlayer;\n    }\n\n    return {\n        getCurrentPlayer,\n        playRound,\n        shiftTurn,\n    };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameController);\n\n\n//# sourceURL=webpack://battleship/./src/GameController.js?\n}");

/***/ },

/***/ "./src/Gameboard.js"
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship.js */ \"./src/Ship.js\");\n\n\nfunction Gameboard() {\n    //board simulator\n    const board = [];\n    //create board\n    for (let i = 0; i < 10; i++) {\n        const row = [];\n        for (let j = 0; j < 10; j++) {\n            row.push(0);\n        }\n\n        board.push(row);\n    }\n\n    //ships\n    const ships = [];\n\n    //map to trace from coordinates to a ship\n    const map = new Map();\n\n    //missedAttacks array to keep track of attacks over empty cells\n    const missedAttacks = [];\n\n    function placeShip(length, start, orientation) {\n        isValidPlacement(length, start, orientation);\n\n        const ship = (0,_Ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(length);\n        const [x, y] = start;\n\n        if (orientation === \"horizontal\") {\n            for (let j = y; j < y + length; j++) {\n                board[x][j] = 1;\n                map.set(`${[x, j]}`, ship);\n                ship.addCoordinates([x, j]);\n            }\n        } else {\n            for (let i = x; i < x + length; i++) {\n                board[i][y] = 1;\n                map.set(`${[i, y]}`, ship);\n                ship.addCoordinates([i, y]);\n            }\n        }\n\n        ships.push(ship);\n        return ship;\n    }\n\n    function isValidPlacement(length, start, orientation) {\n        const [x, y] = start;\n\n        if (orientation === \"horizontal\") {\n            for (let j = y; j < y + length; j++) {\n                if (!isInsideBoard(x, j)) {\n                    throw new Error(\"Invalid placement: Ship is out of bounds\");\n                }\n\n                if (board[x][j] === 1) {\n                    throw new Error(\"Invalid placement: Ship is overlapping another ship\");\n                }\n            }\n        } else {\n            for (let i = x; i < x + length; i++) {\n                if (!isInsideBoard(i, y)) {\n                    throw new Error(\"Invalid placement: Ship is out of bounds\");\n                }\n\n                if (board[i][y] === 1) {\n                    throw new Error(\"Invalid placement: Ship is overlapping another ship\");\n                }\n            }\n        }\n\n        return true;\n    }\n\n    function isInsideBoard(i, j) {\n        if (i < 0 || i >= 10) return false;\n        if (j < 0 || j >= 10) return false;\n\n        return true;\n    }\n\n    function allShipsSunk() {\n        for (const ship of ships) {\n            if (!ship.isSunk()) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    function receiveAttack(cell) {\n        const [x, y] = cell;\n\n        if (!isInsideBoard(x, y)) {\n            throw new Error(`Invalid attack: [${x}, ${y}] is outside the gameboard.`);\n        }\n\n        if (board[x][y] === -1 || board[x][y] === 2) {\n            throw new Error(`Invalid attack: [${x}, ${y}] has already been attacked.`);\n        }\n\n        const ship = map.get(`${cell}`);\n\n        if (ship === undefined) {\n            missedAttacks.push(cell);\n            board[x][y] = -1;\n            return;\n        }\n\n        ship.hit();\n        board[x][y] = 2;\n    }\n\n    function getBoard() {\n        return structuredClone(board);\n    }\n\n    return {\n        get ships() {\n            return ships;\n        },\n        get missedAttacks() {\n            return missedAttacks;\n        },\n        placeShip,\n        allShipsSunk,\n        receiveAttack,\n        getBoard,\n    };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/Gameboard.js?\n}");

/***/ },

/***/ "./src/Player.js"
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Player(name) {\n    let gameBoard = null;\n\n    function assignBoard(board) {\n        gameBoard = board;\n    }\n\n    function playMove(cell) {\n        gameBoard.receiveAttack(cell);\n    }\n\n    function getBoardCopy() {\n        return gameBoard.getBoard();\n    }\n\n    function hasWon() {\n        return gameBoard.allShipsSunk();\n    }\n\n    return {\n        get name() {\n            return name;\n        },\n        assignBoard,\n        playMove,\n        getBoardCopy,\n        hasWon,\n    };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/Player.js?\n}");

/***/ },

/***/ "./src/Ship.js"
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Ship(length) {\n    let hits = 0;\n    const coordinates = [];\n\n    function isSunk() {\n        if (hits === length) {\n            return true;\n        }\n        return false;\n    }\n\n    function hit() {\n        hits++;\n    }\n\n    function addCoordinates(cell) {\n        coordinates.push(cell);\n    }\n\n    return {\n        get length() {\n            return length;\n        },\n        get hits() {\n            return hits;\n        },\n        get coordinates() {\n            return coordinates;\n        },\n        isSunk,\n        hit,\n        addCoordinates,\n    };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/Ship.js?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DisplayController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DisplayController.js */ \"./src/DisplayController.js\");\n\n\n\nconst displayController = (0,_DisplayController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\ndisplayController.startGame();\n\n\n//# sourceURL=webpack://battleship/./src/index.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
import Gameboard from "../src/Gameboard.js";

describe("Gameboard", () => {
    test("creates an empty gameboard", () => {
        const gameboard = Gameboard();

        expect(gameboard.ships).toEqual([]);
        expect(gameboard.missedAttacks).toEqual([]);
    });

    describe("placeShip()", () => {
        test("places a ship on the gameboard", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "horizontal");

            expect(gameboard.ships).toHaveLength(1);
        });

        test("places a horizontal ship on the correct coordinates", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "horizontal");

            expect(gameboard.ships[0].coordinates).toEqual([
                [2, 3],
                [2, 4],
                [2, 5],
            ]);
        });

        test("places a vertical ship on the correct coordinates", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "vertical");

            expect(gameboard.ships[0].coordinates).toEqual([
                [2, 3],
                [3, 3],
                [4, 3],
            ]);
        });

        test("does not allow a horizontal ship to extend outside the board", () => {
            const gameboard = Gameboard();

            expect(() => {
                gameboard.placeShip(3, [2, 8], "horizontal");
            }).toThrow();
        });

        test("does not allow a vertical ship to extend outside the board", () => {
            const gameboard = Gameboard();

            expect(() => {
                gameboard.placeShip(3, [8, 2], "vertical");
            }).toThrow();
        });

        test("does not allow ships to overlap", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "horizontal");

            expect(() => {
                gameboard.placeShip(3, [2, 4], "horizontal");
            }).toThrow();
        });
    });

    describe("receiveAttack()", () => {
        test("hits a ship when an occupied coordinate is attacked", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "horizontal");

            gameboard.receiveAttack([2, 4]);

            expect(gameboard.ships[0].hits).toBe(1);
        });

        test("records a missed attack", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "horizontal");

            gameboard.receiveAttack([5, 5]);

            expect(gameboard.missedAttacks).toContainEqual([5, 5]);
        });

        test("throws an error when attacking an already hit cell", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "horizontal");

            gameboard.receiveAttack([2, 4]);

            expect(() => {
                gameboard.receiveAttack([2, 4]);
            }).toThrow();
        });

        test("throws an error when attacking an already missed cell", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "horizontal");

            gameboard.receiveAttack([5, 5]);

            expect(() => {
                gameboard.receiveAttack([5, 5]);
            }).toThrow();
        });

        test("does not allow an attack outside the board", () => {
            const gameboard = Gameboard();

            expect(() => {
                gameboard.receiveAttack([10, 10]);
            }).toThrow();
        });
    });

    describe("allShipsSunk()", () => {
        test("returns false when at least one ship is not sunk", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "horizontal");

            const ship = gameboard.ships[0];

            ship.hit();
            ship.hit();

            expect(gameboard.allShipsSunk()).toBe(false);
        });

        test("returns true when all ships are sunk", () => {
            const gameboard = Gameboard();

            gameboard.placeShip(3, [2, 3], "horizontal");

            const ship = gameboard.ships[0];

            ship.hit();
            ship.hit();
            ship.hit();

            expect(gameboard.allShipsSunk()).toBe(true);
        });
    });
});

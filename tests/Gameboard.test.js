import Gameboard from "../src/Gameboard.js";
import Ship from "../src/Ship.js";

describe("Gameboard", () => {
    test.skip("creates an empty gameboard", () => {
        const gameboard = Gameboard();

        expect(gameboard.ships).toEqual([]);
        expect(gameboard.missedAttacks).toEqual([]);
    });

    describe("placeShip()", () => {
        test("places a ship on the gameboard", () => {
            const gameboard = Gameboard();
            const ship = Ship(3);

            gameboard.placeShip(ship, [2, 3], "horizontal");

            expect(gameboard.ships).toContain(ship);
        });

        test("places a horizontal ship on the correct coordinates", () => {
            const gameboard = Gameboard();
            const ship = Ship(3);

            gameboard.placeShip(ship, [2, 3], "horizontal");

            expect(gameboard.ships[0].coordinates).toEqual([
                [2, 3],
                [2, 4],
                [2, 5],
            ]);
        });

        test("places a vertical ship on the correct coordinates", () => {
            const gameboard = Gameboard();
            const ship = Ship(3);

            gameboard.placeShip(ship, [2, 3], "vertical");

            expect(gameboard.ships[0].coordinates).toEqual([
                [2, 3],
                [3, 3],
                [4, 3],
            ]);
        });
    });

    describe("receiveAttack()", () => {
        test.skip("hits a ship when an occupied coordinate is attacked", () => {
            const gameboard = Gameboard();
            const ship = Ship(3);

            gameboard.placeShip(ship, [2, 3], "horizontal");

            gameboard.receiveAttack([2, 4]);

            expect(ship.hits).toBe(1);
        });

        test.skip("records a missed attack", () => {
            const gameboard = Gameboard();
            const ship = Ship(3);

            gameboard.placeShip(ship, [2, 3], "horizontal");

            gameboard.receiveAttack([5, 5]);

            expect(gameboard.missedAttacks).toContainEqual([5, 5]);
        });
    });

    describe("allShipsSunk()", () => {
        test("returns false when at least one ship is not sunk", () => {
            const gameboard = Gameboard();
            const ship = Ship(3);

            gameboard.placeShip(ship, [2, 3], "horizontal");

            ship.hit();
            ship.hit();

            expect(gameboard.allShipsSunk()).toBe(false);
        });

        test("returns true when all ships are sunk", () => {
            const gameboard = Gameboard();
            const ship = Ship(3);

            gameboard.placeShip(ship, [2, 3], "horizontal");

            ship.hit();
            ship.hit();
            ship.hit();

            expect(gameboard.allShipsSunk()).toBe(true);
        });
    });
});
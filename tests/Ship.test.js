import Ship from "../src/Ship.js";

describe("Ship", () => {
    test("creates a ship with the given length", () => {
        const ship = new Ship(3);

        expect(ship.length).toBe(3);
    });

    test("starts with zero hits", () => {
        const ship = new Ship(3);

        expect(ship.hits).toBe(0);
    });

    test("hit() increases the number of hits", () => {
        const ship = new Ship(3);

        ship.hit();

        expect(ship.hits).toBe(1);
    });

    test("hit() can be called multiple times", () => {
        const ship = new Ship(3);

        ship.hit();
        ship.hit();

        expect(ship.hits).toBe(2);
    });

    test("ship is not sunk when hits are less than its length", () => {
        const ship = new Ship(3);

        ship.hit();
        ship.hit();

        expect(ship.isSunk()).toBe(false);
    });

    test("ship is sunk when hits equal its length", () => {
        const ship = new Ship(3);

        ship.hit();
        ship.hit();
        ship.hit();

        expect(ship.isSunk()).toBe(true);
    });
});

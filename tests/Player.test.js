import Player from "../src/Player.js";

describe("Player", () => {
    test("creates a player with a gameboard", () => {
        const player = Player();

        expect(player.gameboard).toBeDefined();
    });

    test("player's gameboard is initially empty", () => {
        const player = Player();

        expect(player.gameboard.ships).toEqual([]);
        expect(player.gameboard.missedAttacks).toEqual([]);
    });

    test("each player has their own gameboard", () => {
        const player1 = Player();
        const player2 = Player();

        expect(player1.gameboard).not.toBe(player2.gameboard);
    });

    test("player's gameboard can place ships", () => {
        const player = Player();

        player.gameboard.placeShip(3, [2, 3], "horizontal");

        expect(player.gameboard.ships).toHaveLength(1);
    });

    test("player's gameboard can receive attacks", () => {
        const player = Player();

        player.gameboard.placeShip(3, [2, 3], "horizontal");
        player.gameboard.receiveAttack([2, 3]);

        expect(player.gameboard.ships[0].hits).toBe(1);
    });
});

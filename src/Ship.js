function Ship(length) {
    let hits = 0;

    function isSunk() {
        if (hits === length) {
            return true;
        }
        return false;
    }

    function hit() {
        hits++;
    }

    return {
        get length() {
            return length;
        },
        get hits() {
            return hits;
        },
        isSunk,
        hit,
    };
}

export default Ship;

function Ship(length) {
    let hits = 0;
    const coordinates = [];

    function isSunk() {
        if (hits === length) {
            return true;
        }
        return false;
    }

    function hit() {
        hits++;
    }

    function addCoordinates(cell){
        coordinates.push(cell);
    }

    return {
        get length() {
            return length;
        },
        get hits() {
            return hits;
        },
        get coordinates(){
            return coordinates;
        },
        isSunk,
        hit,
        addCoordinates
    };
}

export default Ship;

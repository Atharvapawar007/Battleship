function Ship(length){
    let hitCount = 0;
    let hasSunk = false;

    function getLength(){
        return length;
    }

    function getHitCount(){
        return hitCount;
    }

    function isSunk(){
        return hasSunk;
    }

    function hit(){
        hitCount++;
    }
}

export default Ship;
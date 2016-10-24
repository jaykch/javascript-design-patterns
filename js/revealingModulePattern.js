var log = function (x) {
    console.log(x);
};

const enemyRowPos = [60, 143, 226];
const playerRowPos = [48, 131, 214];
const numberOfEnemies = 8;

var Enemy = function (x, y) {
    var x = x;
    var y = y;
    var sprite = 'images/enemy-bug.png';
    var speed;

    var _randomiseSpeed = function () {
        speed = Math.floor((Math.random() * 300) + 50);
    };
    _randomiseSpeed();

    var _collision = function(){
        if (((y == enemyRowPos[2] && player.getPlayerCoords('y') == playerRowPos[2]) ||
            (y == enemyRowPos[1] && player.getPlayerCoords('y') == playerRowPos[1]) ||
            (y == enemyRowPos[0] && player.getPlayerCoords('y') == playerRowPos[0]))
            && player.getPlayerCoords('x') < x + 80 && player.getPlayerCoords('x') > x - 60) {
            player.reset();
        }
    };
    var update = function (dt) {
        _enemyBounds();
        _collision();
        x += speed * dt;
    };
    var render = function () {
        ctx.drawImage(Resources.get(sprite), x, y);
    };
    var _enemyBounds = function () {
        if (x > 500) {
            x = -90;
            _randomiseSpeed();
        }
    };

    return {
        render: render,
        update: update
    }
};

var allEnemies = [];

var generateEnemies = function(numberOfEnemies){
    for (var i = 0; i < numberOfEnemies; i++) {
        //randomize enemies between the 3 row positions and different x coordinates across the game
        allEnemies.push(Enemy(Math.floor((Math.random() * 350) + 1),enemyRowPos[Math.floor((Math.random() * 3) + 1)-1]));
    }
};

generateEnemies(numberOfEnemies);

var player = (function () {

    var x = 200;
    var y = 380;
    var sprite = 'images/char-boy.png';
    var verticalMoveCount = 83;
    var horizontalMoveCount = 100;


    var update = function () {
        _playerBounds();
    };
    var getPlayerCoords = function (coordinate) {
        switch (coordinate) {
            case 'x':
                return x;
                break;
            case 'y':
                return y;
                break;
        }
    };
    var render = function () {
        ctx.drawImage(Resources.get(sprite), x, y);
    };
    var handleInput = function (direction) {
        switch (direction) {
            case 'left':
                x += -horizontalMoveCount;
                break;
            case 'right':
                x += horizontalMoveCount;
                break;
            case 'up':
                y += -verticalMoveCount;
                break;

            case 'down':
                y += verticalMoveCount;
                break;
        }
    };
    var reset = function(){
        x = 200;
        y = 380;
    };
    var _playerBounds = function () {
        if (y < 0) {
            x = 200;
            y = 380;
        }
        //log("updating");
        if (x < 0) {
            x = 0;
        }
        else if (x > 400) {
            x = 400;
        }
        else if (y > 380) {
            y = 380;
        }
    };

    return {
        update: update,
        render: render,
        handleInput: handleInput,
        getPlayerCoords: getPlayerCoords,
        reset: reset
    }
})();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
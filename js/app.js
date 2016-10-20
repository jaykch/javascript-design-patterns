// Enemies our player must avoid

var log = function (x) {
    console.log(x);
};

const initialPlayerXPos = 200;
const initialPlayerYPos = 380;
const playerLeftMoveCount = -100;
const playerRightMoveCount = 100;
const playerUpMoveCount = -83;
const playerDownMoveCount = 83;

const xPlayerBounds = [0,400];
const yPlayerBounds = [0, 380];

const xEnemyBounds = [-80,500];

const enemyRowPos = [60, 143, 226];

//todo: maybe randomize it in a method

var randomSpeed = function () {
    return Math.floor((Math.random() * 200) + 50);
};

var randomEnemyPosition = function () {

};

var Enemy = function (row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = randomSpeed();
    this.x = this.setPosition();

    //switch statement to select each row by parsing in an argument
    //position for each row
    switch (row) {
        case 1:
            this.y = enemyRowPos[0];
            break;
        case 2:
            this.y = enemyRowPos[1];
            break;
        case 3:
            this.y = enemyRowPos[2];
            break;
    }
};

//todo: design setters maybe
Enemy.prototype.setPosition = function () {
    return Math.floor((Math.random() * 350) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;// Math.floor((Math.random() * 10) + 1);
    //if statement to reset the position of the bug once it reaches the boundaries
    if (this.x > xEnemyBounds[1]) {
        this.x = xEnemyBounds[0];
        this.speed = randomSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = initialPlayerXPos;
    this.y = initialPlayerYPos;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    //todo: add methods for resetting position

};

Player.prototype.reset = function (coordinate) {
    switch (coordinate) {
        case 'x':
            this.x = initialPlayerXPos;
            break;
        case 'y':
            this.y = initialPlayerYPos;
            break;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//move method for moving the player in each direction
Player.prototype.move = function (direction) {
    switch (direction) {
        case 'left':
            this.x += playerLeftMoveCount;
            break;
        case 'right':
            this.x += playerRightMoveCount;
            break;
        case 'up':
            this.y += playerUpMoveCount;
            break;

        case 'down':
            this.y += playerDownMoveCount;
            break;
    }
};

Player.prototype.handleInput = function (direction) {
    //use the move method to move the player
    this.move(direction);
    //resetting player position if it hits a wall
    if (this.y < yPlayerBounds[0]) {
        this.reset('y');
        this.reset('x');
    }
    //log("updating");
    if (this.x < xPlayerBounds[0]) {
        this.x = xPlayerBounds[0];
        log(this.x);
    }
    else if (this.x > xPlayerBounds[1]) {
        this.x = xPlayerBounds[1];
        log(this.x);
    }
    else if (this.y > yPlayerBounds[1]) {
        this.reset('y');
    }
};

// Now instantiate your objects.
var bug1 = new Enemy(1);
var bug2 = new Enemy(1);
var bug3 = new Enemy(2);
var bug4 = new Enemy(2);
var bug5 = new Enemy(3);
var bug6 = new Enemy(3);
// Place all enemy objects in an array called allEnemies
var allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    /*switch (allowedKeys[e.keyCode]) {
     case 'left':
     player.x += -100;
     break;
     case 'right':
     player.x += 100;
     break;
     case 'up':
     player.y += -83;
     break;
     case 'down':
     player.y += 83;
     break;
     }*/

    player.handleInput(allowedKeys[e.keyCode]);
});

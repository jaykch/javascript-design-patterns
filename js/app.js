// Enemies our player must avoid

var log = function (x) {
    console.log(x);
};

//todo: maybe randomize it in a method

var randoomSpeed = function () {
    return Math.floor((Math.random() * 200) + 50);
};

var Enemy = function (row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = randoomSpeed();
    this.x = Math.floor((Math.random() * 350) + 1);

    //switch statement to select each row by parsing in an argument
    //position for each row
    switch (row) {
        case 1:
            this.y = 60;
            break;
        case 2:
            this.y = 143;
            break;
        case 3:
            this.y = 226;
            break;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;// Math.floor((Math.random() * 10) + 1);
    //if statement to reset the position of the bug once it reaches the boundaries
    if (this.x > 500) {
        this.x = -80;
        this.speed = randoomSpeed();
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
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    //todo: add methods for resetting position
    if (this.y > 400 || this.y < 0) {
        this.y = 380;
        this.x = 200;
    }
    //log("updating");
    if (this.x < 0) {
        this.x = 0;
    }
    else if (this.x > 400) {
        this.x = 400;
    }
    else if (this.y < 0) {
        this.y = 0;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
    //todo: build methods move left and move right
    switch (direction) {
        case 'left':
            this.x += -100;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'up':
            this.y += -83;
            break;
        case 'down':
            this.y += 83;
            break;
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

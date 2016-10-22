//Game coded in object literal pattern

var log = function (x) {
    console.log(x);
};

//permanent row positions for enemy and player
const enemyRowPos = [60, 143, 226];
const playerRowPos = [48, 131, 214];

//configure properties for enemy and player
var config = {
    setEnemyPosition: function (x, y) {
        this.enemyXPos = x;
        this.enemyYPos = y;
    },
    getEnemyPosition: function () {
        return {
            enemyXPos: this.enemyXPos,
            enemyYPos: this.enemyYPos
        }
    },
    setPlayerPosition: function (x, y) {
        this.playerXPos = x;
        this.playerYPos = y;
    },
    getPlayerPosition: function () {
        return {
            playerXPos: this.playerXPos,
            playerYPos: this.playerYPos
        }
    }
};

// Enemies our player must avoid
var enemy = {
    //methods
    init: function () {
        this.config();
    },
    config: function () {
        config.setEnemyPosition(100, 143);
        this.x = config.getEnemyPosition().enemyXPos;
        this.y = config.getEnemyPosition().enemyYPos;
        this.sprite = 'images/enemy-bug.png';
    },
    update: function (dt) {
        this.x += 5;
        if (this.x > 500) this.reset();
        this.collision();
    },
    reset: function () {
        this.x = -80;
    },
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    collision: function(){
        if (((this.y == enemyRowPos[2] && player.y == playerRowPos[2]) ||
            (this.y == enemyRowPos[1] && player.y == playerRowPos[1]) ||
            (this.y == enemyRowPos[0] && player.y == playerRowPos[0]))
            && player.x < this.x + 80 && player.x > this.x - 60) {
            player.setInitialPosition();
            log("Collision....")
        }
    }
};

enemy.init();



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemy];
var player = {

    //methods
    init: function () {
        this.config();
        this.setMoveCount();
    },
    config: function () {
        this.sprite = 'images/char-boy.png';
        this.setInitialPosition();
    },
    update: function () {
        this.playerBounds();
    },
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    setInitialPosition: function () {
        config.setPlayerPosition(200, 380);
        this.x = config.getPlayerPosition().playerXPos;
        this.y = config.getPlayerPosition().playerYPos;
    },
    setMoveCount: function () {
        this.leftMoveCount = -100;
        this.rightMoveCount = 100;
        this.upMoveCount = -83;
        this.downMoveCount = 83;
    },
    getMoveCount: function () {
        return {
            leftMoveCount: this.leftMoveCount,
            rightMoveCount: this.rightMoveCount,
            upMoveCount: this.upMoveCount,
            downMoveCount: this.downMoveCount
        }
    },
    playerBounds: function () {
        if (this.y < 0) {
            this.setInitialPosition();
        }
        //log("updating");
        if (this.x < 0) {
         this.x = 0;
         }
         else if (this.x > 400) {
         this.x = 400;
         }
        else if (this.y > 380) {
            this.y = 380;
        }
    },
    handleInput: function (direction) {
        switch (direction) {
            case 'left':
                this.x += this.getMoveCount().leftMoveCount;
                break;
            case 'right':
                this.x += this.getMoveCount().rightMoveCount;
                break;
            case 'up':
                this.y += this.getMoveCount().upMoveCount;
                break;

            case 'down':
                this.y += this.getMoveCount().downMoveCount;
                break;
        }
    }
};

player.init();

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
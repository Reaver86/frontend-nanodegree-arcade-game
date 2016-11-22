'use strict';
// Enemies our player must avoid
var Enemy = function (speed, row) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.speed = speed;

	this.row = row + 2;

	// Start position left of screen
	this.x = -100;
	this.y = this.rowNumbers[row - 1];

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// y-values for the three enemy rows, determined by trial and error
Enemy.prototype.rowNumbers = [227, 145, 65];

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * 50 * dt;

	// When enemy went out of sight to the right
	// it gets reset to the left, reassigned a new row and a new speed
	if (this.x > 600) {
		this.x = -100;
		var newRow = Math.floor(Math.random() * 3) + 1;
		this.y = this.rowNumbers[newRow - 1];
		// add 2 to enemy row to be comparable to players row
		this.row = newRow + 2;

		this.speed = Math.floor(Math.random() * 5) + 1;
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
	// starting row and column numbers
	this.row = 1;
	this.col = 3;

	this.x = this.colNumbers[this.col - 1];
	this.y = this.rowNumbers[this.row - 1];
	this.sprite = 'images/char-boy.png';

	// number of lives before game over
	this.lives = 3;
};

// translate discrete row and col values set in handleInput function
// to according x and y values
Player.prototype.update = function (dt) {
	this.x = this.colNumbers[this.col - 1];
	this.y = this.rowNumbers[this.row - 1];
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// set row and col value of player according to direction input
// only if action within board boundaries
Player.prototype.handleInput = function (direction) {
	if (direction === 'left') {
		if (this.col > 1) {
			this.col--;
		}
	}
	if (direction === 'right') {
		if (this.col < 5) {
			this.col++;
		}
	}
	if (direction === 'up') {
		if (this.row < 6) {
			this.row++;
		}
	}
	if (direction === 'down') {
		if (this.row > 1) {
			this.row--;
		}
	}
};

// reset function for player position
Player.prototype.setToStart = function () {
	this.row = 1;
	this.col = 3;
};

// y-values for the player rows, determined by trial and error
Player.prototype.rowNumbers = [406, 322, 237, 155, 72, -10];
// x-values for the player columns, determined by trial and error
Player.prototype.colNumbers = [0, 101, 202, 303, 404];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numOfEnemies = 5;
var allEnemies = [];
for (var i = 0; i < numOfEnemies; i++) {
	var oneToThree = Math.floor(Math.random() * 3) + 1;
	var oneToFive = Math.floor(Math.random() * 5) + 1;
	allEnemies.push(new Enemy(oneToFive, oneToThree));
}

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

	player.handleInput(allowedKeys[e.keyCode]);
});

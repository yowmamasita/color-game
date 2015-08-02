(function() {
  'use strict';

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  var Game = {

    preload: function() {
      game.load.image('t1', 'assets/t1.png');
      game.load.image('t2', 'assets/t2.png');
      game.load.image('t3', 'assets/t3.png');
      game.load.image('t4', 'assets/t4.png');
      game.boxWidth = 50;
      game.boxHeight = 50;
      game.xLength = game.width / game.boxWidth;
      game.yLength = game.height / game.boxHeight;
      game.boxMap = [];
      game.typeMap = { t1: [], t2: [], t3: [], t4: [] };

    },

    create: function() {
      // fill board with boxes
      var posX = 0;
      var posY = 0;
      while (posY < game.height) {
        while (posX < game.width) {
          Box.randomCreate(posX, posY);
          posX += game.boxWidth;
        }
        posX = 0;
        posY += game.boxHeight;
      }

    },

    update: function() {
      //
    },

  };

  function Box(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.iX = this.x / game.boxWidth;
    this.iY = this.y / game.boxHeight;
    this.killed = false;
    // draw to board
    this.sprite = game.add.sprite(this.x, this.y, this.type);
    this.sprite.scale.setTo(50, 50);
    // attach input
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.destroy, this);
  }

  Box.randomCreate = function(x, y) {
    var randomType = 't' + (Math.floor(Math.random() * 4) + 1);
    var box = new Box(randomType, x, y);

    // add to *Map
    if (!box.iX) game.boxMap[box.iY] = [];
    game.boxMap[box.iY].push(box);
    game.typeMap[box.type].push(box);

    return box;
  };

  Box.prototype.destroy = function() {
    var adjacent = this.getAdjacentSameType();
    if (adjacent.length) {
      recursiveDestroyAdjacent(this);
    }
    // game.typeMap[this.type].map(destroyAdjacent(this.iX, this.iY));
  };

  Box.prototype.getAdjacentSameType = function() {
    var self = this;

    var leftBox = [self.iX - 1, self.iY];
    var rightBox = [self.iX + 1, self.iY];
    var topBox = [self.iX, self.iY - 1];
    var bottomBox = [self.iX, self.iY + 1];

    if (self.iX === 0) {
      leftBox = null;
    }
    else if (self.iX === game.xLength - 1) {
      rightBox = null;
    }
    if (self.iY === 0) {
      topBox = null;
    }
    else if (self.iY === game.yLength - 1) {
      bottomBox = null;
    }

    var adjacent = [];
    [leftBox, rightBox, topBox, bottomBox].forEach(function(e) {
      if (!e) return;
      var box = game.boxMap[e[1]][e[0]];
      if (!box) return;
      if (box.type == self.type && !box.killed) {
        adjacent.push(box);
      }
    });
    return adjacent;
  }

  function recursiveDestroyAdjacent(box) {
    box.killed = true;
    box.sprite.kill();
    box.getAdjacentSameType().map(recursiveDestroyAdjacent);
  }

  function destroyAdjacent(x, y) {
    return function(box) {
      box.killed = true;
      box.sprite.kill();
    }
  }

  game.state.add('Game', Game);
  game.state.start('Game');

})();

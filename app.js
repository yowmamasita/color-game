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
      // score
      game.scoreInt = 0;
      game.scoreText = game.add.text(8, 6, 'Score ' + game.scoreInt, {
        font: '40px Arial',
        fill: '#fff',
        stroke: '#000',
        strokeThickness: 1,
      });

    },

  };

  function Box(type, x, y) {
    this.type = type;
    this.iX = x / game.boxWidth;
    this.iY = y / game.boxHeight;
    this.killed = false;
    // draw to board
    this.sprite = game.add.sprite(x, y, this.type);
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

    return box;
  };

  Box.prototype.destroy = function() {
    var adjacent = this.getAdjacentSameType();
    if (adjacent.length) {
      var columnNumbers = recursiveDestroyAdjacent(this);
      checkEmptyColumns(columnNumbers);
      recursiveMoveDownAdjacent(this.iX, 'leftright');
      // update score
      game.scoreText.setText('Score ' + game.scoreInt);
    }
  };

  Box.prototype.moveX = function(iX) {
    game.boxMap[this.iY][this.iX] = null;
    this.iX = iX;
    this.sprite.x = this.iX * game.boxWidth;
    game.boxMap[this.iY][this.iX] = this;
  };

  Box.prototype.moveY = function(iY) {
    game.boxMap[this.iY][this.iX] = null;
    this.iY = iY;
    this.sprite.y = this.iY * game.boxHeight;
    game.boxMap[this.iY][this.iX] = this;
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

  function recursiveDestroyAdjacent(box, state) {
    if (!state) state = {};
    if (box && !box.killed) {
      box.killed = true;
      box.sprite.kill();
      state[box.iX] = true;
      var adjacent = box.getAdjacentSameType();
      adjacent.forEach(function(b) {
        recursiveDestroyAdjacent(b, state);
      });
      game.scoreInt += 1;
    }
    // return numbers of updated columns
    return Object.keys(state);
  }

  function checkEmptyColumns(columns) {
    for (var i = 0; i < columns.length; i++) {
      var x = parseInt(columns[i]);
      var column = getColumn(x);
      if (!column.length) moveColumnXToY(x + 1, x);
    }
  }

  function moveColumnXToY(source, destination) {
    if (source >= game.xLength) return;
    var column = getColumn(source);
    if (!column.length) moveColumnXToY(source + 1, destination);
    else {
      column.forEach(function(box) {
        box.moveX(destination);
      });
      moveColumnXToY(source + 1, source);
    }
  }

  function recursiveMoveDownAdjacent(x, direction) {
    var column = getColumn(x);
    var y = game.yLength - 1;
    for (var i = 0; i < column.length; i++) {
      column[i].moveY(y--);
    }
    while (y > 0) {
      game.boxMap[y--][x] = null;
    }
    if (x > 0 && direction.indexOf('left') > -1) {
      recursiveMoveDownAdjacent(x - 1, 'left');
    }
    if (x < game.xLength && direction.indexOf('right') > -1) {
      recursiveMoveDownAdjacent(x + 1, 'right');
    }
  }

  function getColumn(x) {
    var column = [];
    for (var i = game.yLength - 1; i >= 0; i--) {
      var box = game.boxMap[i][x];
      if (box && !box.killed) {
        column.push(game.boxMap[i][x]);
      }
    }
    return column;
  }

  game.state.add('Game', Game);
  game.state.start('Game');

})();

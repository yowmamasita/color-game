(function() {
  'use strict';

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  var Game = {
    preload: function() {

      game.load.image('t1', 'assets/t1.png');
      game.load.image('t2', 'assets/t2.png');
      game.load.image('t3', 'assets/t3.png');
      game.load.image('t4', 'assets/t4.png');

    },

    create: function() {

      // fill board with boxes
      this.boxWidth = 50;
      this.boxHeight = 50;
      var posX = 0;
      var posY = 0;
      while (posY < game.height) {
        while (posX < game.width) {
          var box = new Box(this.randomBoxType(), posX, posY);
          posX += this.boxWidth;
        }
        posX = 0;
        posY += this.boxHeight;
      }

    },

    update: function() {
      //
    },

    randomColor: function() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    },

    randomBoxType: function() {
      return 't' + (Math.floor(Math.random() * 4) + 1);
    },

  };

  function Box(type, x, y) {
    this.x = x;
    this.y = y;
    this.type = type;
    // draw to board
    this.sprite = game.add.sprite(this.x, this.y, this.type);
    this.sprite.scale.setTo(50, 50);
    // attach input
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.destroy, this);
  }

  Box.prototype.destroy = function() {
    this.sprite.kill();
  };

  game.state.add('Game', Game);
  game.state.start('Game');

})();

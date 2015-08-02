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

      game.physics.startSystem(Phaser.Physics.ARCADE);
      // var graphics = game.add.graphics();

      var tileWidth = 50;
      var tileHeight = 50;

      var posX = 0;
      var posY = 0;

      while (posY < game.height) {

        while (posX < game.width) {

          // var color = this.randomColor();
          // graphics.beginFill(color);
          // graphics.lineStyle(1, color);
          // graphics.drawRect(posX, posY, tileWidth, tileHeight);

          var tile = game.add.sprite(posX, posY, this.randomTile());
          tile.scale.setTo(50, 50);

          posX += tileWidth;

        }

        posX = 0;
        posY += tileHeight;

      }

      console.log('Heyyyyy');
      console.log(game.width);
      console.log(game.height);

    },

    update: function() {
      //
    },

    randomColor: function() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    },

    randomTile: function() {
      return 't' + (Math.floor(Math.random() * 4) + 1);
    },

  };

  Game.colors = [
    0x468966,
    0xFFF0A5,
    0xFFB03B,
    0xB64926,
  ];

  game.state.add('Game', Game);
  game.state.start('Game');

})();

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

      this.tiles = game.add.physicsGroup(Phaser.Physics.ARCADE);
      this.tiles.enableBody = true;

      // var graphics = game.add.graphics();

      this.tileWidth = 50;
      this.tileHeight = 50;

      var posX = 0;
      var posY = 0;

      while (posY < game.height) {

        while (posX < game.width) {

          // var color = this.randomColor();
          // graphics.beginFill(color);
          // graphics.lineStyle(1, color);
          // graphics.drawRect(posX, posY, this.tileWidth, this.tileHeight);

          // var tile = game.add.sprite(posX, posY, this.randomTile());
          var tile = this.tiles.create(posX, posY, this.randomTile());
          tile.scale.setTo(50, 50);

          tile.body.collideWorldBounds = true;
          tile.body.gravity.y = 300;

          tile.inputEnabled = true;
          tile.events.onInputDown.add(this.poof, tile);
          tile.events.onRemovedFromWorld.add(this.test, tile);
          console.log(tile.events);

          posX += this.tileWidth * 2;

        }

        posX = 0;
        posY += this.tileHeight * 2;

      }


    },

    update: function() {

      game.physics.arcade.collide(this.tiles);

    },

    randomColor: function() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    },

    randomTile: function() {
      return 't' + (Math.floor(Math.random() * 4) + 1);
    },

    poof: function(tile) {
      tile.kill();
    },

    test: function(tile) {
      console.log('HEY');
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

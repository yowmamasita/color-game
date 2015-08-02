(function() {
  'use strict';

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('Game', Game);

  game.state.start('Game');

  var Game = {
    preload: function() {

      // game.load.image('sky', 'assets/sky.png');

    },

    create: function() {

      // game.add.sprite(0, 0, 'star');

    },

    update: function() {
      //
    },
  };
})();

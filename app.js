(function() {
  'use strict';

  var game = new Phaser.Game(600, 450, Phaser.AUTO, 'game');

  game.state.add('Game', Game);

  game.state.start('Game');

  var Game = {
    preload: function() {
      //
    },

    create: function() {
      //
    },

    update: function() {
      //
    },
  };
})();

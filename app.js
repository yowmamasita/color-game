(function() {
  'use strict';

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  var Game = {
    preload: function() {

      // game.load.image('sky', 'assets/sky.png');

    },

    create: function() {

      // game.add.sprite(0, 0, 'star');
      var graphics = game.add.graphics(0, 0);

      // 0x44B3C2
      // 0xF1A94E
      // 0xE45641
      // 0x5D4C46
      // 0x7B8D8E
      // 0xF2EDD8

      var color = this.randomColor();
      graphics.beginFill(color);
      graphics.lineStyle(1, color);
      graphics.drawRect(0, 0, 50, 50);

      console.log('Heyyyyy');

    },

    update: function() {
      //
    },

    randomColor: function() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
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

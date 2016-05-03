'use strict';

var Backbone = require('backbone');

/**
 * Creates a TicTacToeModel for rendering the Game TicTacToe.
 * It holds several data like GameName, NxN count, CurrentPlayer and others.
 *
 * Examples:
 *
 *     var TicTacToeModel = require('TicTacToeModel');
 *     var gameModel = new TicTacToeModel();
 *
 * @module models/TicTacToeModel
 */

module.exports = Backbone.Model.extend({
    defaults: {
      gameName: 'TicTacToe Default',
      nxnCount: 3,
      mode: 'X',
      currentPlayer: '',
      moveCount: 0
    }
});

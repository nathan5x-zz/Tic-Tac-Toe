'use strict';

var Backbone = require('backbone');

/**
 * Creates a MainViewModel for rendering the main view data
 * like number of games and others.
 *
 * Examples:
 *
 *     var MainViewModel = require('MainViewModel');
 *     var viewModel = new MainViewModel();
 *
 *  @module models/MainViewModel
 *
 */

module.exports = Backbone.Model.extend({

    defaults: {
      numGames: 0,
      playerOWins: 0,
      playerOWins: 0,
      ties: 0
    }
});

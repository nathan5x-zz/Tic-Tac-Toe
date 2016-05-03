'use strict';

/**
 * Basic dependency module import.
 * Importing underscore.
 */
var _ = require('underscore');

/**
 * Custom dependency module import for MainView
 * Importing custom modules.
 */
var templateManager = require('./templateManager');
var BaseView = require('../_extend/baseView');
var GameView = require('./game');
var GameViewModel = require('../../models/TicTacToeModel');

/**
 *  Defining constants.
 *
 */
var MIN_GAME_COL = 4;

/**
 * Creates a Main view with all the interactive functionality.
 *
 * Example Usage:
 *
 *     var mainView = new MainView({model: mainViewModel});
 *     mainView.render().el // Returns the HTML element of Main View
 *
 * @module module/main
 */
module.exports = BaseView.extend({
    /**
     *   css class name for the main view element.
     *
     *   @property className
     *
    **/
    className: 'module',
    /**
     *   Declaring events for main view
     *
     *   @property events
     *
    **/
    events: {
      "click #addGame": "addGameClicked"
    },
    /**
     * EventHandler for 'AddGame' button click event
     *
     * @method addGameClicked
     *
     * @param {JS_Event} e The event to dispatch with an optional object to pass to the event payload
     * @return {undefined}
     **/
    addGameClicked: function(e){
      e.preventDefault();

      /*
       * Get NxN size from prompt handler
       */
      var nxnSize = window.prompt("Enter the number of columns", MIN_GAME_COL);
      if(null === nxnSize){
        return;
      }

      if(nxnSize >= MIN_GAME_COL){
          this.addNewGame(nxnSize);
      } else{
          window.alert("Enter Integer (Preferrably 4 to 20)");
      }
    },
    /**
     * Creates a new Game based on the NxN size provided by the user.
     *
     * @method addNewGame
     *
     * @param {Number} size NxN size of the Game
     * @return {undefined}
     **/
    addNewGame: function(size){
      var _gameCount =  this.$el.find('.game-card').length;

      /*
       * Create new GameViewModel based on the input - size
       */
      var gameViewModel = new GameViewModel({
          gameName: 'TicTacToe '+_gameCount++ + ' (' + size +' x '+ size +')',
          nxnCount: size
      });

      /*
       * Passing the model object to GameView to render the DOM
       */
      var gameView = new GameView({model: gameViewModel});
      this.$el.find('#gamesContainer').append(gameView.render().el);
      this.$el.find('#numGames').html(_gameCount++);
    },
    /**
     *   HTML Template for main view rendering
     *
     *   @property template
     *
    **/
    template: templateManager.mainViewTemplate,
    /**
     * Initialize the default setting and evend biding.
     * It binds all the View methods to current main view (this)
     *
     * @method initialize
     *
     * @param {Object} options JS object to initial settings.
     * @return {undefined}
     **/
    initialize: function(options) {
        _.bindAll(this, "addGameClicked");
        _.bindAll(this, "addNewGame");
    },
    /**
     * Renders the main view UI based on the GameViewModel
     *
     * @method render
     *
     * @return {Object} this Returns the view object with all the functionalities.
     **/
    render: function() {
      var defaultGameViewModel = new GameViewModel({
          nxnCount: 3,
          gameStatus: '',
          tiesCount: 0,
          mode: 'X'
      });

      var gameView = new GameView({model: defaultGameViewModel});

      this.$el.html(this.template(this.model.attributes));
      this.$el.find('#gamesContainer').append(gameView.render().el).fadeIn();
      return this;
    }
});

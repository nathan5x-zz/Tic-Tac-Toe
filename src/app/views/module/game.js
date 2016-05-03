'use strict';

/**
 * Basic dependency module import.
 * Importing jQuery and underscore.
 */
var $ = require('jquery');
var _ = require('underscore');

/**
 * Custom dependency module import for GameView
 * Importing custom modules.
 */
var BaseView = require('../_extend/baseView');
var templateManager = require('./templateManager');

/**
 * Importing templates from TemplateManager instead of importing templates individually.
 *
 */
var $viewX = templateManager.xViewTemplate();
var $viewO = templateManager.oViewTemplate();

/**
 *  Defining Game View constants.
 *
 */
var MIN_GAME_COL = 3;
var MODE_X = 'X';
var MODE_O = 'O';
var DEFAULT_CELL_WIDTH = 104.5;

/**
 * Creates a Game view with all the interactive functionality.
 *
 * Example Usage:
 *
 *     var gameView = new GameView({model: gameViewModel});
 *     gameView.render().el // Returns the HTML element of Game View
 *
 * @module module/game
 */
module.exports = BaseView.extend({
    /**
     *   css class name for the Game view element.
     *
     *   @property className
     *
    **/
    className: 'game-card',
    /**
     *   Declaring events for Game view
     *
     *   @property events
     *
    **/
    events: {
      "click .cell": "cellClicked",
      "click .reset-button": "resetGame"
    },
    /**
     * EventHandler for every cell click event in the Game View
     *
     * @method cellClicked
     *
     * @param {JS_Event} e The event to dispatch with an optional object to pass to the event payload
     * @return {undefined}
     **/
    cellClicked: function(e){

     /*
      * Intialize indices and row / column jQuery DOM objects
      * for processing the cell click
      */
      var $clickedItem = $(e.currentTarget);
      var colIndex = $clickedItem.index();
      var $parentRow = $clickedItem.parent();
      var rowIndex = $parentRow.index();

      if (!$.isEmptyObject($clickedItem.data())) {
        return;
      }

      /*
       * Creating temporary model object to store and reassign Game view model data.
       * Avoids accessomg this.model every time
       */
      var modelData = this.model.attributes;
      modelData.mode = (modelData.mode  === MODE_X) ? MODE_O : MODE_X;

      /*
       * Setting data attribute 'mode' to handle and process current cell selection.
       */
      $clickedItem.data('mode', modelData.mode);

      /*
       * Counter for evaluating tie at the end.
       * Uses the model property 'moveCount'
       */
      modelData.moveCount++;

      /*
       * For alternating the selection between 'X' and 'O'.
       * Also sets the current player property.
       */
      if(modelData.mode === MODE_X) {
          modelData.currentPlayer = MODE_O;
          $clickedItem.html($viewO);
      } else {
          modelData.currentPlayer = MODE_X;
          $clickedItem.html($viewX);
      }

      this.model.attributes = modelData;

      /*
       * Evaluating the rule of 'row' based win.
       * Queries the current row cells and process the comparison.
       */
      var rowCells = $parentRow.children();

      if (hasAllSameValues(rowCells)) {
          window.alert(modelData.currentPlayer  + " is the winner in " + modelData.gameName);
          this.resetGame();
          return;
      }

      /*
       * Evaluating the rule of 'column' based win.
       * Queries the current column cells and process the comparison.
       */
      var colCells = $parentRow.parent().find('.row .cell:nth-child(' + (colIndex + 1) + ')');

      if (hasAllSameValues(colCells)) {
        window.alert(modelData.currentPlayer  + " is the winner in " + modelData.gameName);
        this.resetGame();
        return;
      }

      /*
       * Evaluating the rule of 'diagonal' based win.
       * Queries the diagonal cells and process the comparison.
       */
      var leftDiagCells = [];
      var rightDiagCells = [];
      var $rows = $parentRow.parent().find('.row');

      $rows.each(function(index) {
        var $cells = $(this).find('.cell');
        var count = $cells.length;

        var cell = $cells.filter(function(cIndex) {
          return cIndex === index;
        });
        leftDiagCells.push(cell);

        var rIndex = count - 1 - index;
        cell = $(this).find('.cell:eq(' + rIndex + ')');

        rightDiagCells.push(cell);
      });

      if (colIndex !== rowIndex) {
        if (hasAllSameValues(rightDiagCells)) {
          window.alert(modelData.currentPlayer  + " is the winner in " + modelData.gameName);
          this.resetGame();
          return;
        }
      } else {
        if (hasAllSameValues(leftDiagCells)) {
          window.alert(modelData.currentPlayer  + " is the winner in " + modelData.gameName);
          this.resetGame();
          return;
        }
      }

      /*
       * If none of the win rule matches, it evaluates 'tie' condition.
       * It will reset the game if the match is tie.
       */
      var _cellCount = this.$el.find('.cell').length;

      if(_cellCount === modelData.moveCount) {
          window.alert("Game ends in tie. Click Ok to Restart");
          this.resetGame();
          return;
      }
    },
    /**
     * EventHandler for 'restartGame' call and also resets the game after a win / tie.
     *
     * @method resetGame
     *
     * @param {JS_Event} e The event to dispatch with an optional object to pass to the event payload
     * @return {undefined}
     **/
    resetGame: function(e){
      if(e) {
          e.preventDefault();
      }

     /*
      * Resets the move count for new game
      */
      this.model.set("moveCount", 0);

    /*
     * Removes all the data attribute values and empty all the cells for new game.
     */
      var $cells = this.$el.find('.cell');
      $cells.removeData();
      $cells.each(function(index) {
        $(this).empty();
      });
    },
    /**
     *   HTML Template for Game view rendering
     *
     *   @property template
     *
    **/
    template: templateManager.gameViewTemplate,
    /**
     * Initialize the default setting and evend biding.
     * It binds all the View methods to current game view (this)
     *
     * @method initialize
     *
     * @param {Object} options JS object to initial settings.
     * @return {undefined}
     **/
    initialize: function(options) {
        _.bindAll(this, "cellClicked");
        _.bindAll(this, "resetGame");
        _.bindAll(this, "render");
        this.model.on("change", this.render);
    },
    /**
     * Renders the Game view NxN cells based on model object data
     * passed at the creation.
     *
     * @method render
     *
     * @return {Object} this Returns the view object with all the functionalities.
     **/
    render: function() {
      this.$el.html(this.template(this.model.attributes));

     /*
      * Sets the size of the Game NxN
      */
      var nxnSize = this.model.get("nxnCount");
      var _gameCardWidth =0;

      if( nxnSize >= MIN_GAME_COL) {

        /*
         * Generates NxN cells based on the Model Object data passed at the creation.
         */
          for(var i=0; i< nxnSize ;i++){

            var $row = $("<div class='row'> </div>");
            /*
             * Calculating the width of the full Game View based on the number of cells.
             */
            _gameCardWidth+=DEFAULT_CELL_WIDTH;

            for(var j=0; j<nxnSize ;j++){
              var $cell = $("<div class='cell'></div>");
              $cell.empty();
              $row.append($cell);
            }
            this.$el.find('.game-info').parent().prepend($row);
          }
          this.$el.css('width', _gameCardWidth+'px');
      }
      return this;
    }
});

/**
 * Creates the temporary array to store only data value of the cell DOM elements.
 *
 * @method hasAllSameValues
 *
 * @param {Array} $array jQuery array of DOM elements (cells in this case)
 * @return {boolean} compareArrayItems(dataArray) Returns the result of compareArrayItems
 **/
function hasAllSameValues($array) {
  var dataArray = [];
  $.each($array, function(idx, val) {
    dataArray.push($(val).data());
  });
  return compareArrayItems(dataArray);
}

/**
 * Checks all the elements in the array has same value.
 *
 * @method compareArrayItems
 *
 * @param {Array} array JS array of data values from Cells
 * @return {boolean} Returns boolean value based on the array values.
 **/
function compareArrayItems(array) {
  if ($.isEmptyObject(array[0])) {
    return false;
  }

  return array.every(function(value, index, array) {
    return value && value.mode === array[0].mode;
  });
}

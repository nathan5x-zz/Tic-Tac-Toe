'use strict';

var Backbone = require('backbone'),
    TicTacToeModel = require('../models/TicTacToeModel');

/**
 * Creates a collection with TicTacToeModel
 *
 * Examples:
 *
 *     var myCollection = require('collection');
 *
 * @module collections/collection
 */

module.exports = Backbone.Collection.extend({
    model: TicTacToeModel
});

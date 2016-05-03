'use strict';

var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

/**
 * Creates a base view for game view creation. Each Game View extends this
 * module to create sub views.
 *
 * Examples:
 *
 *     var BaseView = require('baseView');
 *     var myCustomView = BaseView.extend({
 *             "custom_property": "value"
 *     })
 *
 * @module _extend/baseView
 */

module.exports = Backbone.View.extend({
    /**
     *   Executed immediately when creating a new instance.
     *   Hides the containing element so that we can use the transitioning methods to show it.
     *
     *   @method initialize
     *   @return {null}
    **/
    initialize: function(options) {
        /* Code will be overriden in subclass view*/
    },

   /**
    * Allows dispatching of events from the view.
    *
    * @method trigger
    *
    * Examples:
    *
    *    this.trigger($.Event('event-name:namespace', {item: item}));
    *
    * @param {jQuery_Event} evt The event to dispatch with an optional object to pass to the event payload
    * @return {null}
    **/
    trigger: function(evt) {
        this.$el.trigger(evt);
    },

   /**
    * Cleans up the view.  Should be extended in every subview to take care of any cleanup tasks that need to happen when that view is not currently visible.
    *
    * @method clean
    * @return {null}
    **/
    clean: function() {
        throw new Error('Unimplemented AbstractView method clean().  At the least, please define it in your view and add any code necessary for cleanup, if applicable.');
    },

   /**
    * Disposes of the view.  Unbinds its events and removes it from the DOM.
    *
    * @method dispose
    * @return {null}
    **/
    dispose: function() {
        this.undelegateEvents();
        this.remove();
    }
});

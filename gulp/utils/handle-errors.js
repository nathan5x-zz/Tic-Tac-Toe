'use strict';

/**
 * Gulp Task - browserify
 */

var notify = require('gulp-notify');

/**
 * Handling Gulp build errors
 *
 * @module gulp/handle-errors
 */
module.exports = function() {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    /* Exit task if inside a pipe */
    if(this) this.emit('end');
};

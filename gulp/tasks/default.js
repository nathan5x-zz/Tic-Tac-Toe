'use strict';

/**
 * Gulp Task - default
 * It creates the build sequence of all the Gulp tasks
 */

var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function(cb) {
    global.isWatching = true;

    runSequence(
        'clean',
        'copy',
        'styles:dev',
        'lint',
        'browserify',
        'browser-sync',
        'doc-gen',
        'watch',
        cb
    );
});

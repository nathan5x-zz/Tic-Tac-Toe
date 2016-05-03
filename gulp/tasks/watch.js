'use strict';

/**
 * Gulp Task - watch
 */

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../config.json');

gulp.task('watch', function() {
    gulp.watch(config.src + 'app/views/**/*.html', ['browserify']);
    gulp.watch(config.src + 'app/views/index.html', ['copy', browserSync.reload]);
    gulp.watch(config.src + 'app/**/*.'+config.cssSrcExtension, ['styles:dev']);
    gulp.watch(config.src + 'app/views/**/*.js', ['lint']);
});

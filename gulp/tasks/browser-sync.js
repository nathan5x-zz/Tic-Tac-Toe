'use strict';

/**
 * Gulp Task - browser-sync
 */
 
var gulp = require('gulp'),
    config = require('../config.json'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: config.dist
        }
    });
});

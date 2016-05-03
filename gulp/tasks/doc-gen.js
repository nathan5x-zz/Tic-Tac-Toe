'use strict';

/**
 * Gulp Task - doc-gen
 * Generates JS Doc helper documentation
 */

var gulp = require('gulp'),
    config = require('../config.json'),
    gulpDoxx = require('gulp-doxx');

gulp.task('doc-gen', function() {

  return gulp.src([config.src + 'app/**/*.js'], {base: '.'})
    .pipe(gulpDoxx({ title: config.appName +' APIs', urlPrefix: '/docs' }))
    .pipe(gulp.dest(config.dist + config.docs));

});

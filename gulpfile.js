'use strict';
require('dotenv').config(); // Prevents running through Cloudflare

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js'));

// Prevents running through Cloudflare
if (process.env.LOCAL_DEV === 'true') {
  var browserSync = require('browser-sync').create();

  gulp.task('serve', function() {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
    gulp.watch('./sass/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js', gulp.series('minify-js')).on('change', browserSync.reload);
  });

  gulp.task('default', gulp.series('sass', 'minify-js', 'serve'));
}

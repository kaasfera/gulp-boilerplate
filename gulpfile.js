const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const browserSync = require('browser-sync').create();

gulp.task('scss', () => {
    gulp.src('./src/scss/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    gulp.src('./src/js/app.js')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('start', ['scss', 'js'], () => {
    browserSync.init({
        server: './',
        notify: false
    });
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch('./src/scss/*.scss', ['scss']);
    gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('build-css', () => {
    gulp.src('./src/scss/app.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
});

gulp.task('build-js', () => {
    gulp.src('./src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build-images', () => {
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('build', ['build-css', 'build-js', 'build-images']);


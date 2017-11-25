var gulp = require('gulp');

// Import gulp-minify-css เพื่อใช้งาน
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');



gulp.task('scss', function() {
    return gulp.src([
          'resources/assets/sass/*.scss',
        ])
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(concat('app.css'))
        .pipe(minifyCSS())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('js', function() {
console.log('js');
    return gulp.src([
            'resources/assets/js/app.js',
            'resources/assets/js/**/*.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js/'))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js/'));
});





// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('resources/assets/js/**/*.js', ['js']);
    gulp.watch('resources/assets/sass/*.scss', ['scss']);

 
});

// Default Task
gulp.task('default', ['scss','js', 'watch']);


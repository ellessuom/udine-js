const gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint');

gulp.task('sass', function () {
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

// configure the jshint task
gulp.task('jshint', function () {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
    gulp.watch('./assets/js/*.js', ['jshint']);
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['connect', 'watch']);
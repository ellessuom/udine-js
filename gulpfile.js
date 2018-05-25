// const gulp = require('gulp'),
//                 sass       = require('gulp-sass'),
//                 connect    = require('gulp-connect'),
//                 jshint     = require('gulp-jshint'),
//                 babel      = require('gulp-babel');
//             var browserify = require('browserify');
//             var transform  = require('vinyl-transform');

// gulp.task('sass', function () {
//     return gulp.src('./src/sass/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./dist'))
//         .pipe(connect.reload());
// });

// gulp.task('connect', function () {
//     connect.server({
//         livereload: true
//     });
// });

// gulp.task('html', function () {
//     return gulp.src('./*.html')
//         .pipe(gulp.dest('./'))
//         .pipe(connect.reload());
// });

// gulp.task('browserify', function () {
//     var browserified = transform(function (filename) {
//         var b = browserify(filename);
//         return b.bundle();
//     });

//     return gulp.src(['./src/**/*.js'])
//         .pipe(browserified)
//         .pipe(gulp.dest('./dist'));
// });

// gulp.task('babel', () =>
//     gulp.src('./src/index.js')
//     .pipe(babel())
//     .pipe(gulp.dest('./dist'))
//     .pipe(connect.reload())
// );

// gulp.task('jshint', function () {
//     return gulp.src('./src/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('jshint-stylish'));
// });

// gulp.task('watch', function () {
//     gulp.watch('./src/**/*.js', ['browserify', 'babel']);
//     gulp.watch('./src/**/*.js', ['jshint']);
//     gulp.watch('./src/**/*.scss', ['sass']);
//     gulp.watch('./*.html', ['html']);
// });

// gulp.task('default', ['connect', 'watch']);




const browserify   = require('browserify'),
      gulp         = require('gulp'),
      sourcemaps   = require('gulp-sourcemaps'),
      sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      source       = require('vinyl-source-stream'),
      buffer       = require('vinyl-buffer'),
      browserSync  = require('browser-sync');

const entryPoint    = './src/index.js',
      browserDir    = './',
      sassWatchPath = './src/sass/**/*.scss',
      jsWatchPath   = './src/**/*.js',
      htmlWatchPath = './*.html';

gulp.task('js', function () {
    return browserify(entryPoint, { standalone: 'Bundle', debug: true, extensions: ['es6'] })
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    const config = {
        server: {baseDir: browserDir}
    };

    return browserSync(config);
});

gulp.task('sass', function () {
  return gulp.src(sassWatchPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js']);
    gulp.watch(sassWatchPath, ['sass']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

gulp.task('default', ['js', 'sass', 'watch', 'browser-sync']);
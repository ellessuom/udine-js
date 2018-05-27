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
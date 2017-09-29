var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var image = require('gulp-image');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify    = require('babelify');

var paths = {
  scripts: './js/app.js',
  css: './css/**/*.css',
  images: './img/*'
};

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(minifyCSS())
    .pipe(concat('browserify.min.css'))
    .pipe(gulp.dest('./static/dist/css'));
});

gulp.task('browserify', function () {
    // app.js is your main JS file with all your module inclusions
  return browserify({entries: paths.scripts, debug: true})
    .transform("babelify", { presets: ["es2015"] })
    .bundle()
    .pipe(source('browserify.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./static/dist/js'))
});

gulp.task('image', function () {
  return gulp.src(paths.images)
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('./static/dist/img'));
});

gulp.task('watch', function(){
  //gulp.watch('./less/**/*.less', ['less']);
  gulp.watch('./js/**/*.js', ['scripts']);
  // Other watchers
})


gulp.task('default', [ 'browserify', 'css','image']);
var gulp = require('gulp');
var path = require('path');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var image = require('gulp-image');

var paths = {
  scripts: ['!./public/assets/user/js/**/jquery.min.js','./public/assets/user/js/**/*.js'],
  css: ['./public/assets/user/css/**/*.css'],
  images: './public/assets/user/images/*'
};

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(minifyCSS())
    .pipe(concat('global.min.css'))
    .pipe(gulp.dest('./public/assets/dist/user/css'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('global.min.js'))
    .pipe(gulp.dest('./public/assets/dist/user/js'));
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
    .pipe(gulp.dest('./public/assets/dist/user/images'));
});



gulp.task('default', [ 'scripts', 'css','image']);
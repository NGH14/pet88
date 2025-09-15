const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const inlineCss = require('gulp-inline-css');
const base64 = require('gulp-base64');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const del = require('del');

const paths = {
  pug: 'src/*.pug',
  scss: 'src/style.scss',
  images: 'src/images/**/*',
  dist: 'dist',
};

function clean() {
  return del([paths.dist]);
}

function compilePug() {
  return gulp.src(paths.pug)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.dist));
}

function compileSass() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist));
}

function copyImages() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(`${paths.dist}/images`));
}

function tobase64() {
  return gulp.src(`${paths.dist}/*.html`)
    .pipe(base64({
      baseDir: paths.dist,
      extensions: ['png'],
      maxImageSize: 200 * 1024, // 200k
      debug: true
    }))
    .pipe(gulp.dest(paths.dist));
}

function inline() {
  return gulp.src(`${paths.dist}/*.html`)
    .pipe(inlineCss({ applyStyleTags: true, removeStyleTags: true, url: 'file://' + __dirname + '/dist/' }))
    .pipe(gulp.dest(paths.dist));
}

function minify() {
  return gulp.src(`${paths.dist}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist));
}

const build = gulp.series(clean, gulp.parallel(compilePug, compileSass, copyImages), inline, tobase64, minify);

function watch() {
  gulp.watch('src/**/*.pug', build);
  gulp.watch('src/**/*.scss', build);
  gulp.watch(paths.images, build);
}

exports.default = build;
exports.watch = watch;

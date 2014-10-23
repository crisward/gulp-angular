//settings
var srcjs = './src/main.coffee';
var destjs = 'main.js';
var srccss = './src/main.styl';
var allcss = ['./src/**/*.styl','./src/**/*.css']
var outputfolder = './build';

//watch modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var coffeeify = require('coffeeify');
var debowerify = require('debowerify');
var jadeify = require('jadeify');
var livereload = require('gulp-livereload');
var stylus = require('gulp-stylus');
var nib = require('nib');

//production modules
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var stripify = require('stripify');
var minifyCSS = require('gulp-minify-css');
var streamify = require('gulp-streamify');

gulp.task('watchjs',function(){
  var bundler = watchify(browserify(srcjs, watchify.args));
  bundler = addTransforms(bundler);
  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))// log errors if they happen
      .pipe(source(destjs))
      .pipe(gulp.dest(outputfolder))
      .pipe(livereload());
  }
  return rebundle();
});

function addTransforms(bundler){
  bundler.transform('coffeeify');
  bundler.transform('jadeify');
  bundler.transform('debowerify');
  return bundler;
}

gulp.task('watchcss',function(){
  function cssbundle(){
    gulp.src(srccss)
      .pipe(stylus({use: nib(),'include css':true}))
      .on('error', gutil.log.bind(gutil, 'Stylus Error'))
      .pipe(gulp.dest(outputfolder))
      .pipe(livereload());
  }
  gulp.watch(allcss,cssbundle);
  cssbundle();
});

gulp.task('prodjs',function(){
  var bundler = addTransforms(browserify(srcjs));
  bundler.transform('stripify');
  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(destjs))
    .pipe(streamify(ngAnnotate()))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(outputfolder))
});

gulp.task('prodcss',function(){
  gulp.src(srccss)
    .pipe(stylus({use: nib(),'include css':true}))
    .pipe(minifyCSS({keepSpecialComments:0}))
    .on('error', gutil.log.bind(gutil, 'Stylus Error'))
    .pipe(gulp.dest(outputfolder))
});


gulp.task('default',['watchjs','watchcss']);
gulp.task('production',['prodjs','prodcss']);




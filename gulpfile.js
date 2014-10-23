
var srcjs = './src/main.coffee';
var destjs = 'main.js';
var srccss = './src/main.styl';
var allcss = ['./src/**/*.styl','./src/**/*.css']
var outputfolder = './build';

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


gulp.task('watchjs',function(){
  var bundler = watchify(browserify(srcjs, watchify.args));
  bundler.transform('coffeeify');
  bundler.transform('jadeify');
  bundler.transform('debowerify');
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


gulp.task('watchcss',function(){
  function cssbundle(){
    gulp.src(srccss)
      .pipe(stylus({use: nib(),'include css':true}))
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(gulp.dest(outputfolder))
      .pipe(livereload());
  }
  gulp.watch(allcss,cssbundle);
  cssbundle();
});

gulp.task('default',['watchjs','watchcss'])
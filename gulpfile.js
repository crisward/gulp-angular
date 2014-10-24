//settings
var srcjs = ['./src/main.coffee','./src/**/*.test.coffee'];
var destjs =['main.js','tests.js'];
var srccss = './src/main.styl';
var allcss = ['./src/**/*.styl','./src/**/*.css']
var outputfolder = './build';
var karmaCommonConf = {
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    autoWatchBatchDelay:1000,
    files: [
      outputfolder+'/tests.js',
      {pattern: outputfolder+'/'+destjs, watched: true, included: false, served: false}
    ]
  };

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
var notify = require("gulp-notify");
var glob = require('glob');

//production modules
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var stripify = require('stripify');
var minifyCSS = require('gulp-minify-css');
var streamify = require('gulp-streamify');

//test modules
var karma = require('karma').server;


gulp.task('watchjs',function(){
  srcjs.forEach(function(src,key){
    var files = glob.sync(src);//use this so multiple sources can be passed
    var bundler = watchify(browserify(files,{cache:{},packageCache:{},fullPaths:true,debug:true}));
    bundler = addTransforms(bundler);
    bundler.on('update', rebundle);

    function rebundle() {
      return bundler.bundle()
        .on('error', errorHandler)//gutil.log.bind(gutil, 'Browserify Error'))// log errors if they happen
        .pipe(source(destjs[key]))
        .pipe(gulp.dest(outputfolder))
        .pipe(livereload());
    }
    return rebundle();
  });
});

function addTransforms(bundler){
  bundler.transform('coffeeify');
  bundler.transform('jadeify');
  bundler.transform('debowerify');
  return bundler;
}

function errorHandler() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end');
}

gulp.task('watchcss',function(){
  function cssbundle(){
    gulp.src(srccss)
      .pipe(stylus({use: nib(),'include css':true}))
      .on('error',errorHandler)// gutil.log.bind(gutil, 'Stylus Error'))
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
    .on('error', errorHandler)
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

gulp.task('test', function (done) {
  karma.start(karmaCommonConf, done);
});


gulp.task('default',['watchjs','watchcss','test']);
gulp.task('production',['prodjs','prodcss']);




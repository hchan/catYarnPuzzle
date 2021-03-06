/**
  To add more typings use package.json
  To test locally : file:///C:/catYarnGame/www/index.html
  To test from appspot : http://catyarngame.appspot.com/secretLocation

*/
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var glob = require('glob');
const b = require('gulp-browserify-typescript');
var runSequence = require('run-sequence');
var files = [];
/*
 To add jquery,
 modify Main.ts to have these lines:

 import * as $ from "jquery"
 window['$'] = $;
 window['jQuery'] = $;

*/
/*
  To add bootstrap
  import "bootstrap"; in Main.ts
*/
files = files.concat(glob.sync('*.ts'));

var outputFile = 'bundle.js';
var outputPath = "www/js";
var webserver = require('gulp-webserver');
var exec = require('child_process').exec;



gulp.task("default", function () {

    return browserify({
        basedir: '.',
        debug: true,
        entries: files,
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source(outputFile))
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', done => {
  b({
    watch: true,
    sourcemaps: true,
    src : files,
    outputPath : outputPath,
    outputFile : outputFile
  }).on('end', done);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('deploy', function (cb) {
  exec("echo Y | deployGloud.bat", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('build', function(cb) {
    exec("phonegap build android", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('makeRelease', function(cb) {
    exec("phonegap build android --release", function (err, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	cb(err);
    });
})

gulp.task('signAPK', function(cb) {
    exec("signAPK.bat", function (err, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	cb(err);
    });
})

gulp.task('package', function(cb) {
    runSequence('makeRelease',
		'signAPK',
		cb);

})

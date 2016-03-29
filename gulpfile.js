process.env.DEBUG = process.env.DEBUG || 'fcc:*';

require('babel-core/register');
var gulp = require('gulp'),
  path = require('path'),

  // utils
  babel = require('gulp-babel'),

  // server process
  nodemon = require('gulp-nodemon'),
  sync = require('browser-sync'),

  // lint
  eslint = require('gulp-eslint'),

  // unit-tests
  tape = require('gulp-tape'),
  tapSpec = require('tap-spec');

var reloadDelay = 1000;
var reload = sync.reload;
var paths = {
  server: './src/app.js',
  serverIgnore: [
    'gulpfile.js',
    'public/',
    'node_modules/',
    'data/',
    'hidden/'
  ],

  node: {
    src: './client',
    dest: 'common/app'
  },

  syncWatch: [
    'src/**/*.js',
    'scripts/**/*.js'
  ]

};

function errorHandler() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

gulp.task('serve', function(cb) {
  var called = false;
  nodemon({
    script: paths.server,
    ext: '.js .json',
    ignore: paths.serverIgnore,
    exec: path.join(__dirname, 'node_modules/.bin/babel-node'),
    env: {
      'NODE_ENV': process.env.NODE_ENV || 'development',
      'DEBUG': process.env.DEBUG || 'fcc:*'
    }
  })
    .on('start', function() {
      if (!called) {
        called = true;
        setTimeout(function() {
          cb();
        }, reloadDelay);
      }
    })
    .on('restart', function(files) {
      if (files) {
        console.log('Files that changes: ', files);
      }
      setTimeout(function() {
        console.log('Restarting browsers');
        reload();
      }, reloadDelay);
    });
});

gulp.task('lint-js', function() {
  return gulp.src([
    'src/**/*.js',
    'scripts/**/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format());
});

function collector(file, memo) {
  return Object.assign({}, JSON.parse(file.contents), memo);
}

function done(manifest) {
  return sortKeys(manifest);
}

var watchDependents = [
  'serve'
];

gulp.task('watch', watchDependents, function() {
  gulp.watch(paths.syncWatch, ['lint-js']);
});

gulp.task('default', [
  'lint-js',
  'watch'
]);

gulp.task('test', function() {
  return gulp.src('test/**/*.test.js')
    .pipe(tape({
      reporter: tapSpec()
    }));
});

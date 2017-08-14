const gulp         = require('gulp'),
      del          = require('del'),
      cssnano      = require('gulp-cssnano'),
      concat       = require('gulp-concat'),
      rename       = require('gulp-rename'),
      uglify       = require('gulp-uglify'),
      server       = require('gulp-webserver'),
      watch        = require('gulp-watch'),
      autoprefixer = require('gulp-autoprefixer'),
      named        = require('vinyl-named'),
      less         = require('gulp-less'),
      webpack      = require('webpack-stream'),
      plumber      = require('gulp-plumber'),
      webConfig    = require('./webpack.config.js');

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('html', () => {
  return gulp.src(['app/templates/*.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('less', () => {
  return gulp.src([
    'app/less/*.less'
  ])
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(less())
    .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
  return gulp.src(['app/js/*.js'])
    .pipe(named())
    .pipe(webpack(webConfig))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor', () => {
  return gulp.src(['app/vendor/*.js'])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/vendor'));
});

gulp.task('js:watch', () => {
  const watch = Object.create(webConfig);

  watch.watch = true;

  return gulp.src([
    'app/js/*.js'
  ])
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack(watch))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('img', () => {
  return gulp.src(['app/img/*'])
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', () => {
  return gulp.src(['app/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('serve', () => {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: 'index.html'
    }));
    
  gulp.start('watch');
});

gulp.task('watch', () => {
  watch('app/templates/*', () => {
    gulp.start('html');
  });
    
  watch('app/less/**/*', () => {
    gulp.start('less');
  });

  watch('app/vendor/*', () => {
    gulp.start('vendor');
  });
    
  watch('app/img/*', () => {
    gulp.start('img');
  });
    
  watch('app/fonts/*', () => {
    gulp.start('fonts');
  });
    
  gulp.start('js:watch');
});

gulp.task('build', ['html', 'less', 'js', 'vendor', 'img', 'fonts']);

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
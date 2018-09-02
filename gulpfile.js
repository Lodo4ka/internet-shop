var gulp = require('gulp');
var scss = require('gulp-sass');
var plumber = require('gulp-plumber')
var notify = require('gulp-notify');
var bs = require('browser-sync').create();
// var concat = require('gulp-concat');

gulp.task('styles', function(){
  return gulp.src('src/scss/style.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'Styles',
          message: err.message
        };
      })
    }))
    .pipe(scss({ output: 'expanded' }))
    // .pipe(concat('./src/scss/libs/font-awesome.css'))
    .pipe(gulp.dest('dist'))
})

gulp.task('copy:html', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('copy:img', function(){
  return gulp.src('src/img/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(gulp.dest('dist/img'))
})

gulp.task('watch', function(){
  gulp.watch('src/scss/**/*.scss', gulp.series('styles'))
  gulp.watch('src/index.html', gulp.series('copy:html'))
  gulp.watch(['src/scss/**/*.scss', 'src/index.html', 'src/img/**/*.{png,jpg,jpeg,gif,svg}']).on('change', bs.reload)
})

gulp.task('bs', function() {
    bs.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('default', gulp.parallel(
  gulp.series('styles', 'copy:html', 'copy:img', 'watch'),
  'bs'
))
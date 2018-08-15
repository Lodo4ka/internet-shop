var gulp = require('gulp');
var scss = require('gulp-sass');
var plumber = require('gulp-plumber')
var notify = require('gulp-notify');
var bs = require('browser-sync').create();

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
    .pipe(gulp.dest('dist'))
})

gulp.task('copy:html', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function(){
  gulp.watch('src/scss/**/*.scss', gulp.series('styles'))
  gulp.watch('src/index.html', gulp.series('copy:html'))
  gulp.watch(['src/scss/**/*.scss', 'src/index.html']).on('change', bs.reload)
})

gulp.task('bs', function() {
    bs.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('default', gulp.parallel(
  gulp.series('styles', 'copy:html', 'watch'),
  'bs'
))
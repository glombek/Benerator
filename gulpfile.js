var gulp = require("gulp"),
    sass = require('gulp-sass');

var paths = {
    webroot: "./"
};

paths.sassDest = paths.webroot + "styles/";
paths.sass = paths.webroot + "styles/**/*.scss";



gulp.task('sass', function (done) {
    gulp.src(paths.sass)
      .pipe(sass().on('error', function (error) {
          console.log(error);
          this.emit('end');
      }))
      .pipe(gulp.dest(paths.sassDest))
      .on('end', done);
});

gulp.task('watch-sass', function () {
    gulp.watch(paths.sass, ['sass']);
});

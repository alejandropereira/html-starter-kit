var gulp = require('gulp'),
	sass = require('gulp-sass'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserSync = require('browser-sync').create();


gulp.task('sass', function(){
   gulp.src('./sass/*.scss')
	   .pipe(sass().on('error', sass.logError))
	   .pipe(gulp.dest('./css'))
	   .pipe(browserSync.stream());
});

gulp.task('coffee', function() {
  gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./js'))
	.pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'coffee'], function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

   gulp.watch('*.html').on('change', browserSync.reload);
   gulp.watch('./sass/**/*.scss', ['sass']);
   gulp.watch('./coffee/**/*.coffee', ['coffee']);
});

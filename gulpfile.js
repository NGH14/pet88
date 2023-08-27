import gulp from 'gulp';
import uglify from 'gulp-uglify';
import { pipeline } from 'readable-stream';

gulp.task('compress', function () {
	return pipeline(gulp.src('build/*.js'), uglify(), gulp.dest('build'));
});

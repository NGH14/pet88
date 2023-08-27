import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

import { pipeline } from 'readable-stream';

gulp.task('compress', function () {
	return pipeline(
		gulp.src('build/*.js'),
		uglify(),
		rename({ extname: '.min.js' }),
		gulp.dest('build'),
	);
});

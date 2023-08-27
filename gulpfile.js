import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

import { pipeline } from 'readable-stream';
import ts from 'gulp-typescript';

const tsProject = ts.createProject('./tsconfig.json');

gulp.task('compress', function () {
	return pipeline(
		gulp.src('build/*.js'),
		uglify(),
		rename({ extname: '.min.js' }),
		gulp.dest('build'),
	);
});

gulp.task('default', function () {
	return (
		tsProject
			.src()
			.pipe(tsProject())
			.js.pipe(uglify())
			// .pipe(rename({ suffix: '.min' }))
			.pipe(gulp.dest('build'))
	);
});

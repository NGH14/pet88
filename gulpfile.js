import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import ts from 'gulp-typescript';

const tsProject = ts.createProject('./tsconfig.json');

gulp.task('compress', function () {
	return gulp
		.src('build/index.js')
		.pipe(uglify())
		.pipe(rename('index.min.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('compiler', function () {
	return tsProject.src().pipe(tsProject()).pipe(gulp.dest('build'));
});

gulp.task('default', gulp.series('compiler', 'compress'));

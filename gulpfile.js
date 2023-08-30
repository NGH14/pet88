const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const replace = require('gulp-replace');
const exec = require('gulp-exec');
const log = require('fancy-log');
const util = require('util');

util.inspect.stye = '';

gulp.on('error', (errors) => log.error(errors).process.exit.bind(process, 1));

gulp.task('setup-doppler', function () {
	const options = {
		continueOnError: false, // default = false, true means don't emit error event
		pipeStdout: false, // default = false, true means stdout is written to file.contents
	};
	const reportOptions = {
		err: true, // default = true, false means don't write err
		stderr: true, // default = true, false means don't write stderr
		stdout: true, // default = true, false means don't write stdout
	};
	return gulp
		.src('./')
		.pipe(exec(() => `doppler setup --no-interactive`, options))
		.on('end', () => log.info('✅ Setup Doppler Success'))
		.pipe(exec.reporter(reportOptions));
});

gulp.task('server', function () {
	const options = {
		continueOnError: false, // default = false, true means don't emit error event
		pipeStdout: true, // default = false, true means stdout is written to file.contents
	};
	const reportOptions = {
		err: true, // default = true, false means don't write err
		stderr: false, // default = true, false means don't write stderr
		stdout: false, // default = true, false means don't write stdout
	};
	return gulp
		.src('./')
		.on('end', () => log.info('⚙️ Start server'))
		.pipe(exec(() => `npm start`, options))
		.pipe(exec.reporter(reportOptions));
});

gulp.task('prd-doppler', () => {
	return gulp
		.src('./doppler.yaml')
		.pipe(replace('be-dev', 'prd'))
		.on('end', () => log.info('✅ Changed Doppler Config'))
		.pipe(gulp.dest('./'));
});

gulp.task('dev-doppler', () => {
	return gulp
		.src('./doppler.yaml')
		.pipe(replace('prd', 'be-dev'))
		.pipe(gulp.dest('./'));
});

gulp.task('start:prd', gulp.series('prd-doppler', 'setup-doppler', 'server'));
gulp.task('dev', gulp.series('dev-doppler', 'setup-doppler', 'server'));

import gulp from 'gulp';
import replace from 'gulp-replace';
import exec from 'gulp-exec';
import log from 'fancy-log';
import file from 'gulp-file';
import fs from 'fs';

gulp.task('setup-doppler', function () {
	const options = {
		continueOnError: true, // default = false, true means don't emit error event
		pipeStdout: false, // default = false, true means stdout is written to file.contents
	};
	return gulp
		.src('./')
		.pipe(exec(() => `doppler setup --no-interactive`, options))
		.on('end', () => log.info('✅ Setup Doppler Success'));
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
	const extraFile = 'doppler.yaml';

	if (fs.existsSync(extraFile)) {
		return gulp
			.src(extraFile)
			.pipe(replace(/(?:test|dev)/g, 'prd'))
			.pipe(gulp.dest('./'));
	} else {
		return gulp
			.src('./')
			.pipe(file('doppler.yaml', 'setup:\n project: pet88\n config: be_prd'))
			.pipe(gulp.dest('./'));
	}
});
gulp.task('dev-doppler', () => {
	const extraFile = 'doppler.yaml';

	if (fs.existsSync(extraFile)) {
		return gulp
			.src(extraFile)
			.pipe(replace(/(?:test|prd)/g, 'dev'))
			.pipe(gulp.dest('./'));
	} else {
		return gulp
			.src('./')
			.pipe(file('doppler.yaml', 'setup:\n project: pet88\n config: be_dev'))
			.pipe(gulp.dest('./'));
	}
});
gulp.task('test-doppler', () => {
	const extraFile = 'doppler.yaml';

	if (fs.existsSync(extraFile)) {
		return gulp
			.src(extraFile)
			.pipe(replace(/(?:prd|dev)/g, 'test'))
			.pipe(gulp.dest('./'));
	} else {
		return gulp
			.src('./')
			.pipe(file('doppler.yaml', 'setup:\n project: pet88\n config: be_test'))
			.pipe(gulp.dest('./'));
	}
});

gulp.task('start:prd', gulp.series('prd-doppler', 'setup-doppler'));
gulp.task('dev', gulp.series('dev-doppler', 'setup-doppler'));
gulp.task('test', gulp.series('test-doppler', 'setup-doppler'));

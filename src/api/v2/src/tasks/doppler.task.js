import gulp from 'gulp';
import log from 'fancy-log';
import exec from 'gulp-exec';

export function setUpDoppler() {
	const options = {
		continueOnError: true, // default = false, true means don't emit error event
		pipeStdout: false, // default = false, true means stdout is written to file.contents
	};
	return gulp
		.src('./')
		.pipe(exec(() => `doppler setup --no-interactive`, options))
		.on('end', () => log.info('✅ Setup Doppler Success'));
}

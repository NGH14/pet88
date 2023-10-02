import winston from 'winston';
const { combine, timestamp, label, printf, align, errors } = winston.format;

const myCustomLevels = {
	levels: {
		error: 0,
		warn: 1,
		data: 2,
		info: 3,
	},
	colors: {
		info: '\x1b[36m',
		error: '\x1b[31m',
		warn: '\x1b[33m',
		data: '\x1b[49m',
	},
};

const colorizer = winston.format.colorize();

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.colorize(),
			),
		}),
		new winston.transports.File({
			filename: 'combined.log',
		}),
	],
	levels: myCustomLevels.levels,
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		errors({ stack: true }),
		align(),
		printf((msg) => {
			const timestamp = colorizer.colorize('data', msg.timestamp);
			const message = msg?.message || '';
			const data = colorizer.colorize('info', msg?.data || '');
			const result = `[${timestamp}] ${message} ${data}`;
			return result;
		}),
	),
});
export default logger;

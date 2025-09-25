import { ERROR_MESSAGE_CORS } from './../constant/error';

const whitelist = [
	process.env.CLIENT_URL,
	`http://localhost:${process.env.LOCAL_PORT}`,
];

// Configuring CORS w/ Dynamic Origin
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error(ERROR_MESSAGE_CORS));
		}
	},
	optionsSuccessStatus: 200,
};
export default corsOptions;

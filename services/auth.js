import admin from '../config/firebase.js';
class Middleware {
	async decodeToken(req, res, next) {
		if (!req.headers.authorization)
			return res.json({ message: 'Internal Error' });
		const token = req.headers.authorization.split(' ')[1];
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.json({ message: 'Un authorize' });
		} catch (e) {
			return res.json({ message: 'Internal Error' });
		}
	}
}

export default new Middleware();

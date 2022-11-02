const express = require('express');

const { getAuth } = require('firebase-admin/auth');
const router = express.Router();

router.get('/', (req, res) => {
	const listAllUsers = (nextPageToken) => {
		// List batch of users, 1000 at a time.
		getAuth()
			.listUsers(1000, nextPageToken)
			.then((listUsersResult) => {
				res.json(listUsersResult);
				if (listUsersResult.pageToken) {
					// List next batch of users.
					listAllUsers(listUsersResult.pageToken);
				}
			})
			.catch((error) => {
				res.json(error);
				console.log('Error listing users:', error);
			});
	};

	listAllUsers();
});

router.delete('/:id', async (req, res) => {
	await getAuth()
		.deleteUser(req.params.id)
		.then(() => {
			res.json('Successfully deleted user');
		})
		.catch((error) => {
			res.json(`Error deleting user: ${error}`);
		});
});

router.post('/', async (req, res) => {
	const newUser = req.body;
	getAuth()
		.createUser({
			email: newUser.email,
			password: newUser.password,
			displayName: newUser.name,
		})
		.then((userRecord) => {
			// See the UserRecord reference doc for the contents of userRecord.
			res.json(userRecord.uid);
		})
		.catch((error) => {
			res.json(`Error creating new user: ${error}`);
		});
});

module.exports = router;

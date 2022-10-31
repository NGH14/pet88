require('dotenv').config('');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');

const { getAuth } = require('firebase-admin/auth');
const middleware = require('./middleware/index');

app.use(cors());
app.use(bodyParser.json());

// app.use(middleware.decodeToken);

const PORT = process.env.LOCAL_PORT || 5000;

mongoose.connection.on('disconnected', () => {
	console.log('MongoDB disconnected!');
});

app.listen(PORT, () => {
	const connectdb = async () => {
		try {
			// await mongoose.connect(process.env.MONGO);
			console.log('MongoDB Connected');
		} catch (error) {
			console.log(error);
		}
	};
	connectdb();
	console.log(`Server listening on ${PORT}`);
});

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

// Start listing users from the beginning, 1000 at a time.

app.get('/api/user', (req, res) => {
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

app.delete('/api/user/:id', async (req, res) => {
	await getAuth()
		.deleteUser(req.params.id)
		.then(() => {
			res.json('Successfully deleted user');
		})
		.catch((error) => {
			res.json(`Error deleting user: ${error}`);
		});
});

app.post('/api/user', async (req, res) => {
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

import express from 'express';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const router = express.Router();

const db = getFirestore();

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

router.get('/store', async (req, res) => {
    const now = new Date();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    try {
        let startFullDate = Timestamp.fromDate(firstDay);
        let endFullDate = Timestamp.fromDate(lastDay);

        db.collection('users')
            .where('createAt', '<=', endFullDate)
            .where('createAt', '>=', startFullDate)
            .get()
            .then((snapshot) => {
                let jsonValue = [];
                snapshot.forEach((docs) => {
                    jsonValue.push(docs.data());
                });
                res.send(jsonValue);
                return;
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } catch (error) {
        res.status(500).json(error);
    }
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

export default router;

// import React, { createContext, useContext } from 'react';

// import axios from 'axios';
// // import {
// // 	EmailAuthProvider,
// // 	GoogleAuthProvider,
// // 	confirmPasswordReset,
// // 	createUserWithEmailAndPassword,
// // 	getIdToken,
// // 	onAuthStateChanged,
// // 	reauthenticateWithCredential,
// // 	sendPasswordResetEmail,
// // 	signInWithEmailAndPassword,
// // 	signInWithPopup,
// // 	signOut,
// // 	updatePassword,
// // 	updateProfile,
// // 	verifyPasswordResetCode,
// // } from 'firebase/auth';
// import {
// 	Timestamp,
// 	collection,
// 	deleteDoc,
// 	doc,
// 	getDoc,
// 	getDocs,
// 	setDoc,
// 	updateDoc,
// } from 'firebase/firestore';

// import { auth, storage } from '../utils/firebase';

// const AuthContext = createContext();

// const API_URL = process.env.REACT_APP_API;

// export const AuthContextProvider = ({ children }) => {
// 	const [user, setUser] = React.useState();
// 	const [firebaseAuthUser, setFireBaseAuthUser] = React.useState({});

// 	const [token, setToken] = React.useState('');
// 	const googleSignIn = () => {
// 		const provider = new GoogleAuthProvider();
// 		return signInWithPopup(auth, provider);
// 	};
// 	const createUser = (email, password) => {
// 		return createUserWithEmailAndPassword(auth, email, password);
// 	};

// 	const updateUser = async (uid, name, dob, gender, phone) => {
// 		const userRef = doc(storage, 'users', uid);
// 		return await updateDoc(userRef, {
// 			name,
// 			dob,
// 			gender,
// 			phone,
// 		});
// 	};

// 	const updateUserByAdmin = async (uid, value) => {
// 		const userRef = doc(storage, 'users', uid);
// 		const cusdob = Timestamp.fromDate(new Date(value.dob));

// 		const { dob, ...rest } = value;
// 		console.log(cusdob);
// 		return await updateDoc(userRef, {
// 			dob: cusdob,
// 			...rest,
// 		});
// 	};

// 	const getOrderByUser = async () => {
// 		try {
// 			const res = await axios.get(`${API_URL}/order/user/${user.id}`);
// 			return res.data;
// 		} catch (error) {
// 			return console.error(error);
// 		}
// 	};

// 	const emailSignIn = (email, password) => {
// 		return signInWithEmailAndPassword(auth, email, password);
// 	};
// 	const UpdatePassword = async (oldPassword, password) => {
// 		const credential = EmailAuthProvider.credential(user.email, oldPassword);

// 		await reauthenticateWithCredential(auth.currentUser, credential);

// 		return updatePassword(firebaseAuthUser, password);
// 	};
// 	const VerifyPasswordResetCode = code => {
// 		return verifyPasswordResetCode(auth, code);
// 	};

// 	const SignOut = () => {
// 		signOut(auth);
// 		setUser();
// 		localStorage.removeItem('name');
// 	};

// 	const forgotPassword = email => {
// 		return sendPasswordResetEmail(auth, email, {
// 			url: `http://localhost:3000/sign-in`,
// 		});
// 	};

// 	function ConfirmResetPassword(oobCode, newPassword) {
// 		return confirmPasswordReset(auth, oobCode, newPassword);
// 	}

// 	const AddUserToDB = async (user, additionalData) => {
// 		const docRef = await doc(storage, 'users', user?.uid);
// 		const docSnap = await getDoc(docRef);

// 		if (!docSnap.exists()) {
// 			return setDoc(doc(storage, 'users', user?.uid), {
// 				createAt: new Date(),
// 				id: user.uid,
// 				email: user.email,
// 				dob: user.dob || new Date(0),
// 				gender: user.gender || null,
// 				photoURL: user.photoURL,
// 				phone: user?.phone || null,
// 				name: user.displayName,
// 				tag: user.tag || [],
// 				role: additionalData.role || 'user',
// 				...additionalData,
// 			});
// 		}
// 	};

// 	const GetAllHotel = async () => {
// 		try {
// 			const res = await axios.get(`${API_URL}/hotel/`, {});
// 			return res.data;
// 		} catch (error) {
// 			return console.error(error);
// 		}
// 	};

// 	const DeleteHotel = async id => {
// 		try {
// 			const res = await axios.delete(`${API_URL}/hotel/${id}`, {});
// 			return res.data;
// 		} catch (error) {
// 			return console.error(error);
// 		}
// 	};

// 	const CreateHotel = async value => {
// 		try {
// 			const res = await axios.post(`${API_URL}/hotel`, value, {});
// 			return res.data;
// 		} catch (error) {
// 			return error;
// 		}
// 	};

// 	const UpdateHotel = async (id, value) => {
// 		try {
// 			const res = await axios.put(`${API_URL}/hotel/${id}`, value, {});
// 			return res.data;
// 		} catch (error) {
// 			return error;
// 		}
// 	};

// 	const AddUserToDBByAdmin = async (uid, additionalData) => {
// 		const docRef = await doc(storage, 'users', uid);

// 		const docSnap = await getDoc(docRef);
// 		const cusdob = Timestamp.fromDate(new Date(additionalData?.dob || 0));
// 		const userRole = additionalData?.role || 'user';
// 		const userPhone = additionalData?.phone || null;
// 		const userGender = additionalData?.gender || null;
// 		const userTag = additionalData?.tag || [];

// 		const { dob, password, confirm, gender, phone, role, tag, ...rest } = additionalData;
// 		if (!docSnap.exists()) {
// 			return setDoc(doc(storage, 'users', uid), {
// 				createAt: new Date(),
// 				id: uid,
// 				dob: cusdob,
// 				role: userRole,
// 				gender: userGender,
// 				phone: userPhone,
// 				tag: userTag,
// 				...rest,
// 			});
// 		}
// 	};

// 	const MultipleDeleteDepart = async listDelete => {
// 		try {
// 			const res = await axios.patch(`${API_URL}/hotel/multiple-delete`, listDelete);
// 			return res.data;
// 		} catch (error) {
// 			return error;
// 		}
// 	};

// 	const getNewUserInCurrentMonth = async () => {
// 		try {
// 			const res = await axios.get(`${API_URL}/user/store`);
// 			return res.data;
// 		} catch (error) {
// 			return error;
// 		}
// 	};

// 	const GetAllUser = async () => {
// 		return await getDocs(collection(storage, 'users'));
// 	};

// 	const DeleteUser = async id => {
// 		return await deleteDoc(doc(storage, 'users', id));
// 	};

// 	const CheckRole = async userID => {
// 		const docRef = doc(storage, 'users', userID);
// 		const docSnap = await getDoc(docRef);

// 		if (docSnap.exists()) {
// 			return docSnap.data()?.role;
// 		}
// 	};

// 	const UserInfo = async userID => {
// 		const docRef = doc(storage, 'users', userID);
// 		const docSnap = await getDoc(docRef);
// 		if (docSnap.exists()) {
// 			setUser(docSnap.data());
// 			localStorage.setItem('name', docSnap.data().name);
// 		}
// 	};

// 	React.useEffect(() => {
// 		const unsubscribe = onAuthStateChanged(auth, currentUser => {
// 			setFireBaseAuthUser(currentUser);
// 			if (currentUser) {
// 				UserInfo(currentUser?.uid);
// 				CheckRole(currentUser?.uid);
// 				currentUser.getIdToken().then(function (idToken) {
// 					setToken(idToken);
// 				});
// 			}
// 		});
// 		return () => {
// 			unsubscribe();
// 			setUser();
// 			localStorage.removeItem('name');
// 		};
// 	}, []);

// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				CreateHotel,
// 				AddUserToDBByAdmin,
// 				UpdatePassword,
// 				updateUser,
// 				CheckRole,
// 				user,
// 				AddUserToDB,
// 				token,
// 				VerifyPasswordResetCode,
// 				googleSignIn,
// 				SignOut,
// 				createUser,
// 				emailSignIn,
// 				forgotPassword,
// 				GetAllUser,
// 				ConfirmResetPassword,
// 				updateProfile,
// 				updateUserByAdmin,
// 				DeleteUser,
// 				GetAllHotel,
// 				DeleteHotel,
// 				UpdateHotel,
// 				getOrderByUser,
// 				MultipleDeleteDepart,
// 				getNewUserInCurrentMonth,
// 			}}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };

// export const UserAuth = () => {
// 	return useContext(AuthContext);
// };

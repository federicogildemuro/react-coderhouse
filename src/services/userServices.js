import { doc, setDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';
import { auth, db } from './firebaseServices';
import { createUserAdapter, updateUserAdapter } from '../adapters/userAdapters';

const createUser = async (email, password, userData) => {
    try {
        const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
        const userId = firebaseUser.user.uid;
        const docRef = doc(db, 'users', userId);
        const adaptedUserData = createUserAdapter({ ...userData });
        await setDoc(docRef, adaptedUserData);
        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 'auth/email-already-in-use') throw new Error('Ya existe un usuario registrado con ese correo electrónico');
        throw new Error(error.message || 'Error al crear el usuario');
    }
};

const fetchUserRole = async (userId) => {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        return docSnap.data().role;
    } catch (error) {
        console.error('Error getting user role:', error);
        throw new Error(error.message || 'Error al obtener el rol del usuario');
    }
}

const fetchUserById = async (id) => {
    try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error('Error getting user by id:', error);
        throw new Error(error.message || 'Error al obtener el usuario');
    }
};

const fetchUserByEmail = async (email) => {
    try {
        const docsRef = collection(db, 'users');
        const querySnapshot = await getDocs(query(docsRef, where('email', '==', email)));

        if (querySnapshot.empty) return null;

        const docSnap = querySnapshot.docs[0];
        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error('Error getting user by email:', error);
        throw new Error(error.message || 'Error al obtener el usuario');
    }
};

const resetPassword = async (email) => {
    try {
        const userData = await fetchUserByEmail(email);

        if (!userData) throw new Error('No existe un usuario registrado con el correo electrónico ingresado');

        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error(error.message || 'Error al enviar el correo de restablecimiento de contraseña');
    }
};

const updatePassword = async (oobCode, newPassword) => {
    try {
        await confirmPasswordReset(auth, oobCode, newPassword);
        return true;
    } catch (error) {
        console.error('Error updating password:', error);
        throw new Error(error.message || 'Error al actualizar la contraseña');
    }
};

const updateUser = async (id, userData) => {
    try {
        const adaptedUserData = updateUserAdapter({ ...userData });
        const docRef = doc(db, 'users', id);
        await setDoc(docRef, adaptedUserData, { merge: true });
        return true;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(error.message || 'Error al actualizar el usuario');
    }
};

export { createUser, fetchUserRole, fetchUserById, resetPassword, updatePassword, updateUser };
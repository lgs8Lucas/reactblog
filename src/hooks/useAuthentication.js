import { db } from "../firebase/config";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from "firebase/auth"; //Pegando funções do Firebase

import { useState, useEffect } from "react";

export const useAuthentication = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);
	//Cleanup
	//Limpando memória liquida
	const [canceled, setCanceled] = useState(false);

	const auth = getAuth();

	function checkIfIsCancelled() {
		if (canceled) return;
	}

	//Register
	const createUser = async (data) => {
		checkIfIsCancelled();
		setLoading(true);
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			); //Cria usuário com login e senha

			await updateProfile(user, { displayName: data.displayName }); //Define username do usuário
			setLoading(false);
			setError(null);
			return user;
		} catch (er) {
			let systemErrorMessage;
			if (er.message.includes("Password"))
				systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
			else if (er.message.includes("email-already"))
				systemErrorMessage = "Este email já está cadastrado";
			else systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
			setError(systemErrorMessage);
		}
		setLoading(false);
	};

	//Logout / sign out
	const logout = () => {
		checkIfIsCancelled(); //Previne memory liq
		signOut(auth);
	};

	//Login / sign in
	const login = async (data) => {
		checkIfIsCancelled();
		setLoading(true);
		setError(false);
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
		} catch (er) {
			let systemErrorMessage;
			if (er.message.includes("invalid-credential"))
				systemErrorMessage = "Verifique seu email e senha e tente novamente!";
			else systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
			setError(systemErrorMessage);
		}
		setLoading(false);
	};

	useEffect(() => {
		return () => setCanceled(true);
	}, []);

	return { auth, createUser, error, loading, logout, login };
};

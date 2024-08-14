import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
	loading: null,
	error: null,
};

const insertReducer = (state, action) => {
	switch (action.type) {
		case "LOADING":
			return { loading: true, error: null };
		case "INSERTED_DOC":
			return { loading: false, error: null };
		case "ERROR":
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const useInsertDocument = (docCollection) => {
	const [response, dispatch] = useReducer(insertReducer, initialState);

	// deal with memory leak
	const [cancelled, setCancelled] = useState(false);

	const checkCancelBeforeDispatch = (action) => {
		if (!cancelled) dispatch(action);
	};

	const insertDocument = async (doc) => {
		checkCancelBeforeDispatch({
			type: "LOADING",
		});
		try {
			const newDoc = { ...doc, createdAt: Timestamp.now() };
			const insertedDocument = await addDoc(
				collection(db, docCollection), //Procura a collection
				newDoc //Adiciona na collection
			);
			checkCancelBeforeDispatch({
				type: "INSERTED_DOC",
				payload: insertedDocument,
			});
		} catch (er) {
			checkCancelBeforeDispatch({
				type: "ERROR",
				payload: er.message,
			});
		}
	};

	//Evitar memory leak
	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	return { insertDocument, response };
};

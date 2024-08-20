import { useState, useEffect } from "react";
import { db } from "../firebase/config";
//                         ordenação            filtro
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	// deal with memory leak
	const [cancelled, setCancelled] = useState(false);

	useEffect(() => {
		async function loadData() {
			if (cancelled) return;
			setLoading(true);

			const collectionRef = await collection(db, docCollection);

			try {
				let q;
				// dashboard
				if (search) {
					// busca
					q = await query(collectionRef, where("tags", "array-contains", search, orderBy("createdAt", "desc"))); //Puxa dados fazendo busca pelas tags
				} else {
					q = await query(collectionRef, orderBy("createdAt", "desc")); //Puxa todos os dados
				}

				await onSnapshot(q, (querySnapshot) => {
					//Sempre que alterar pega novos dados
					setDocuments(
						querySnapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					);
				});
				setLoading(false);
			} catch (er) {
				console.log(er);
				setError(er.message);
				setLoading(false);
			}
		}

		loadData();
	}, [docCollection, search, uid, cancelled]);

	useEffect(() => {
		return () => setCancelled(true);
	}, []);
	return {documents, loading, error};
};

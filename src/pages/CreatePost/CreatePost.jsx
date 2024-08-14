import React from "react";
import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
const initialPost = {
	title: "",
	img: "",
	body: "",
	tags: [],
};

const CreatePost = () => {
	const [post, setPost] = useState(initialPost);
	const [formError, setFormError] = useState("");

	const { insertDocument, response } = useInsertDocument("posts");

	const { user } = useAuthValue();

	const handleChange = (e) => {
		const attPost = post;
		attPost[e.target.name] = e.target.value;
		setPost({ ...attPost });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError("");

		//validar URL da imagem

		//Criar array de tags

		//Checar valores

		insertDocument({ ...post, uid: user.uid, createdby: user.displayName });

		//Redirect
	};

	return (
		<div className={styles.create_post}>
			<h2>Crie um novo post</h2>
			<p>Compartilhe ideias, momentos, fotos, crie um POST!</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Titulo:</span>
					<input
						type="text"
						name="title"
						required
						placeholder="Este será o título do post"
						value={post.title}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>URL da imagem:</span>
					<input
						type="text"
						name="img"
						placeholder="A imagem terá esta URL"
						value={post.img}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>Conteúdo:</span>
					<textarea
						name="body"
						required
						placeholder="Este será o conteudo do post"
						value={post.body}
						onChange={handleChange}
					></textarea>
				</label>
				<label>
					<span>Tags</span>
					<input
						type="text"
						name="tags"
						placeholder="Insira as tags separadas por vírgula"
						value={post.tags}
						onChange={handleChange}
					/>
				</label>
				<button type="submit" className="btn" disabled={response.loading}>
					{response.loading ? "Aguarde" : "Postar"}
				</button>
				{response.error && <p className="error">{response.error}</p>}
			</form>
		</div>
	);
};

export default CreatePost;

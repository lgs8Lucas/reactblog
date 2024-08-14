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

	const navigate = useNavigate();

	const { user } = useAuthValue();

	const handleChange = (e) => {
		const attPost = post;
		attPost[e.target.name] = e.target.value;
		setPost({ ...attPost });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError("");

		//Criar array de tags
		const tagsArray = post.tags.split(",").map(tag => tag.trim().toLowerCase())
		
		//Checar valores
		if (!post.title || !post.tags || !post.body) {
			setFormError("Por favor, preencha todos os campos requiridos!")
		}
		
		let doc = {
			title: post.title,
			body: post.body,
			tags: tagsArray,
			uid: user.uid,
			createdby: user.displayName,
		};

		if (post.img) {
			//validar URL da imagem
			try {
				new URL(post.img);
				doc = {...doc, img:post.img}
			} catch (error) {
				setFormError("Por favor insira uma url de imagem válida ou deixe o campo de imagem vazio!");
				
			}
		}

		if (formError) return;

		insertDocument(doc);

		//Redirect
		navigate('/')
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
				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	);
};

export default CreatePost;

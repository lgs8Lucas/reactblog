import React, { useEffect } from "react";
import styles from "./EditPost.module.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const initialPost = {
	title: "",
	img: "",
	body: "",
	tags: "",
};

const EditPost = () => {
	const { id } = useParams();
	const [post, setPost] = useState(initialPost);
	const { document: actualPost } = useFetchDocument("posts", id);
	const [formError, setFormError] = useState("");

	useEffect(() => {
		if (actualPost) {
			const post = {...initialPost, ...actualPost };
			post.tags = actualPost.tags.join(", ");
			setPost(post);
		}
	}, [actualPost]);

	const { updateDocument, response } = useUpdateDocument("posts");

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
		const tagsArray = post.tags
			.split(",")
			.map((tag) => tag.trim().toLowerCase());

		//Checar valores
		if (!post.title || !post.tags || !post.body) {
			setFormError("Por favor, preencha todos os campos requiridos!");
		}

		let data = {
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
				data = { ...data, img: post.img };
			} catch (error) {
				setFormError(
					"Por favor insira uma url de imagem válida ou deixe o campo de imagem vazio!"
				);
			}
		}
        
		if (formError) return;

		updateDocument(id, data);

		//Redirect
		navigate("/dashboard");
	};

	return (
		<div className={styles.edit_post}>
			{actualPost && (
				<>
					<h2>Editar Post</h2>
					<p>Você está editando o post: {actualPost.title}</p>
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
                        {actualPost.img && (
                            <>
                                <p className={styles.preview_title}>Preview da imagem atual:</p>
                                <img className={styles.preview_image} src={actualPost.img} alt={actualPost.title} />
                            </>
                        )}
                        <img/>
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
							{response.loading ? "Aguarde" : "Editar"}
						</button>
						{response.error && <p className="error">{response.error}</p>}
						{formError && <p className="error">{formError}</p>}
					</form>
				</>
			)}
		</div>
	);
};

export default EditPost;

import React from "react";

import styles from "./Post.module.css";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
	const { id } = useParams();
	const { document: post, loading, error } = useFetchDocument("posts", id);
	return (
		<div className={styles.post_container}>
			{loading && <p>Carregando POST...</p>}
			{error && <p>Erro ao carregar o post tente novamente mais tarde</p>}
			{post && (
				<>
					<h1>{post.title}</h1>
					{post.img && <img src={post.img} alt={post.title} />}
					<p>{post.body}</p>
					<h3>Este post fala sobre: </h3>
					<div className={styles.tags}>
						{post.tags.map((tag, i) => (
							<p key={i}>
								<span>#</span>
								{tag}
							</p>
						))}
					</div>
                    <h3>Criado por:</h3>
                    <p>@{post.createdby}</p>
				</>
			)}
		</div>
	);
};

export default Post;

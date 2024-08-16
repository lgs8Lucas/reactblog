import React from "react";
import styles from "./PostDetail.module.css";

import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
	return (
		<div className={styles.post}>
			<h2>{post.title}</h2>
			{post.img ? <img src={post.img} alt={post.title} /> : <p>{post.body}</p>}
			<p>{post.createdBy}</p>
			<div>
				{post.tags.map((tag, i) => (
					<p key={tag + i}>
						<span>#{tag}</span>
					</p>
				))}
			</div>
			<Link to={`/posts/${post.id}`} className="btn btn-outline">Ver detalhes</Link>
		</div>
	);
};

export default PostDetail;

import React from "react";
import styles from "./PostDetail.module.css";

import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
	return (
		<div className={styles.post_detail}>
			<h2>{post.title}</h2>
			{post.img ? <img src={post.img} alt={post.title} /> : <p>{post.body}</p>}
			<p className={styles.createdby}>@{post.createdby}</p>
			<div className={styles.tags}>
				{post.tags.map((tag, i) => (
					<p key={tag + i}>
						<span>#</span>
						{tag}
					</p>
				))}
			</div>
			<div className={styles.footer}>
				<Link to={`/posts/${post.id}`} className="btn btn-outline">
					Ver detalhes
				</Link>
			</div>
		</div>
	);
};

export default PostDetail;

import React from "react";
import style from "./Home.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";

const Home = () => {
	const [query, setQuery] = useState("");
	const { documents: posts, loading, error } = useFetchDocuments("posts");
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	return (
		<div className={style.home}>
			<h1>Veja os nossos posts mais recentes</h1>
			<form onSubmit={handleSubmit} className={style.search_form}>
				<input
					type="text"
					placeholder="Ou busque por tags..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className="btn btn-dark">Pesquisar</button>
			</form>
			<div>
				{loading && <p>Carregando...</p>}
				{posts && posts.map((post) => <PostDetail post={post} key={post.id} />)}
				{posts && posts.length === 0 && (
					<div className={style.noposts}>
						<p>Não foram encontrados posts</p>
						<Link to="/posts/create" className="btn">
							Criar primeiro post
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;

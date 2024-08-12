import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
	return (
		<div className={styles.about}>
			<h2>
				Sobre o React<span>Blog</span>
			</h2>
			<p>
				Este projeto consiste em um blog desenvolvido em React para o front-end
				e Firebase para o back-end.
			</p>
			<p>
				Ele foi desenvolvido com base no nos conhecimentos que eu obtive no
				curso{" "}
				<a href="https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/?couponCode=KEEPLEARNING">
					React do Zero a Maestria (c/ hooks, router, API, Projetos)
				</a>{" "}
				sendo uma versão com alteraçoes do Mini<b>Blog</b> que foi criado no
				curso.
			</p>
			<p>
				Começe a utiliza-lo criando um post já!{" "}
				<Link to="/posts/create" className="btn">
					Criar Post
				</Link>
			</p>
		</div>
	);
};

export default About;

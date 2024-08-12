import React from "react";
import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Link } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { error: authError, loading, login } = useAuthentication();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = {
			email,
			password,
		};
		setError("");
		const res = await login(user);
	};

	useEffect(() => {
		if (authError) {
			setError(authError);
		} else {
			setError("");
		}
	});

	return (
		<div className={styles.login}>
			<h1>Entrar</h1>
			<p>Faça o login para começar a navegar pelos posts!</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Email:</span>
					<input
						type="email"
						name="email"
						required
						placeholder="Insira seu Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					<span>Senha:</span>
					<input
						type="password"
						name="password"
						required
						placeholder="Insira sua senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit" className="btn" disabled={loading}>
					{loading ? "Aguarde" : "Logar"}
				</button>
				{error && <p className="error">{error}</p>}
			</form>
			<p>
				Ainda não tem um login? <Link to="/register">Cadastre-se ja!</Link>
			</p>
		</div>
	);
};

export default Login;

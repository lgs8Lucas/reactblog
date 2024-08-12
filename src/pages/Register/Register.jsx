import React from "react";
import styles from "./Register.module.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const initialUser = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [user, setUser] = useState({ ...initialUser });
  const [error, setError] = useState("");
  const { createUser, error: authError, loading } = useAuthentication();

  const handleChange = (e) => {
    const attValues = user;
    attValues[e.target.name] = e.target.value;
    setUser({ ...attValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (user.password != user.confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
    else{
        setError('');
    }
  });

  return (
    <div className={[styles.register]}>
      <h1>Cadastre-se no nosso Blog</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Insira seu nome"
            value={user.displayName}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Insira seu Email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={user.password}
            onChange={handleChange}
            minLength={6}
          />
        </label>
        <label>
          <span>Confirmar Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme sua senha"
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Aguarde" : "Cadastrar"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;

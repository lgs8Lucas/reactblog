import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to={"/"} className={styles.brand}>
        React<span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink className={({isActive}) => isActive? styles.active:''} to="/">Início</NavLink>
        </li>
        <li>
          <NavLink className={({isActive}) => isActive? styles.active:''} to="/login">Entrar</NavLink>
        </li>
        <li>
          <NavLink className={({isActive}) => isActive? styles.active:''} to="/about" >Sobre</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

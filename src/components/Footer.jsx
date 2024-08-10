import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>
        Desenvolvido por{" "}
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/lucas-silva-601091219/"
          target="blank"
        >
          Lucas Gonçalves Silva
        </a>
      </h3>
      <p>ReactBlog &copy; 2024</p>
      <p>
        <a
          href="https://github.com/lgs8Lucas"
          target="blank"
          className={styles.link}
        >
          Veja meus outros projetos!
        </a>
      </p>
    </footer>
  );
};

export default Footer;

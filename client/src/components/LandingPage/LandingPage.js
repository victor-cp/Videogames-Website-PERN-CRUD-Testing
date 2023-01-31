import React from "react";
import { Link } from "react-router-dom";

import styles from "./landingPage.module.css";

import backgorund from "../../static/image/Design sem nome.png";
import aranha from "../../static/imagens/aranha-logo.png";
import spider from "../../static/imagens/spider-principal.png";

export default function LandingPage() {
  return (
    <>
      {/* // <div className={styles.container}>
    //   <h1>Welcome</h1>
    //   <Link to="/home">
    //     <button className={styles.btn}>Click</button>
    //   </Link>
    // </div> */}
      <div class={styles.caixa}>
        <div className={styles.caixa1}>
          <img class={styles.fundo} src={backgorund} alt="" />
          <div class={styles.caixa2}>
            <div class={styles.caixa3}>
              {/* <img class={styles.aranha} src={aranha} alt="" /> */}
              <h1 class={styles.caixa3_h1}>INTEGRATING PROJECT: VIDEOGAMES</h1>
              <div className={styles.link}>
                <Link to="/home">
                  <button class={styles.but1}>Click</button>
                </Link>
              </div>
              <h2 class={styles.caixa3_h2}>
                By: Victor Colquichagua Palacin - FT 33A
              </h2>
            </div>
            <img class={styles.spider} src={spider} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

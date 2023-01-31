import React from "react";
import Card from "../Card/Card";
import styles from "./videogames.module.css";

export default function Videogames({ cards, fn, handleDelete, handleModal }) {
  return (
    <>
      <span>Videogames per page: </span>
      <select name="select" onChange={fn} className={styles.select}>
        <option value="15" selected>
          15
        </option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
      <div className={styles.videogames}>
        {cards.map((card) => (
          <div key={card.id}>
            <Card
              card={card}
              handleDelete={() => handleDelete(card.id, card.name)}
              handleModal={() => handleModal(true, card)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

import React from "react";
import styles from "./pagination.module.css";

export function Pagination({
  len,
  paginate,
  paginatePrev,
  paginateNext,
  page,
}) {
  const array = [...Array(len).keys()].map((e) => e + 1);

  // console.log(page);

  return (
    <nav>
      <button onClick={(e) => paginatePrev(e)} className={styles.notCheck}>
        {"<<"}
      </button>
      {array.map((index) => (
        <button
          onClick={(e) => paginate(e, index)}
          key={index}
          className={page === index ? styles.check : styles.notCheck}
        >
          {index}
        </button>
      ))}
      <button onClick={(e) => paginateNext(e)} className={styles.notCheck}>
        {">>"}
      </button>
    </nav>
  );
}

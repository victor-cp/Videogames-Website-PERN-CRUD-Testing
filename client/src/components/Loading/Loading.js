import React from "react";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div class={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailVideogame } from "../../redux/actions/actions";
import Loading from "../Loading/Loading";
// import NotFound from "../../static/imagens/notFound.PNG";

import styles from "./videogameDeatil.module.css";

export default function VideogameDetail({ id }) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(detailVideogame(id));
  }, []);

  return (
    <>
      {detail.length === 0 ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <div>
          <div className={styles.container}>
            <div className={styles.item_one}>
              {detail.image === null || !detail.image ? (
                // <img className={styles.img} src={NotFound} alt="" />
                <></>
              ) : (
                <img
                  src={detail.image}
                  alt={detail.name}
                  className={styles.img}
                />
              )}
            </div>

            <div className={styles.item_two}>
              <div>
                <h1>{detail.name} </h1>
              </div>
              <hr></hr>
              <div>
                <h2 className={styles.about}>About:</h2>
                <section
                  className={styles.section}
                  dangerouslySetInnerHTML={{
                    __html: detail.description,
                  }}
                />
              </div>
              <div>
                <div>
                  <p className={styles.text}>
                    It's an {detail.genres} game ranked at {detail.rating}{" "}
                    points.
                    <span> Only on {detail.platforms}.</span>
                  </p>
                  <h5 className={styles.h5}>
                    Release date: ({detail.release_date})
                  </h5>
                </div>
                <div className={styles.btn}>
                  <Link to="/home">
                    <button className={styles.button_5} role="button">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import NotFound from "../../components/NotFound/NotFound";
import Videogames from "../../components/Videogames/Videogames";
import { searchVideogame } from "../../redux/actions/actions";
import { Pagination } from "../../components/Pagination/Pagination";

import styles from "./search.module.css";

export default function Search() {
  const videogames = useSelector((state) => state.searchVideogames);
  const dispatch = useDispatch();

  const { name } = useParams();

  useEffect(() => {
    dispatch(searchVideogame(name));
    console.log(videogames);
  }, [name]);

  /** ***************/

  const [page, setPage] = useState(1);
  const [range, setRange] = useState(15);

  let videogames_ = videogames;

  const totalVideogames = videogames_.length;
  let lastCard = page * range;
  let firstCard = lastCard - range;
  let cards = videogames_.slice(firstCard, lastCard);

  const len = Math.ceil(totalVideogames / range);

  const paginate = (e, num) => {
    // e.preventDefault();
    setPage(num);
  };

  const paginatePrev = (e) => {
    e.preventDefault();
    if (page === 1) return;
    setPage(page - 1);
  };
  const paginateNext = (e) => {
    e.preventDefault();
    if (page === len) return;
    setPage(page + 1);
  };

  const fn = (e) => {
    setRange(e.target.value);
  };
  /********************************/

  return (
    <>
      <NavBar />
      <div className={styles.homePage}>
        <div className={styles.videogames}>
          {videogames.length !== 0 ? (
            <>
              <h2>Videogames: </h2>
              <Pagination
                len={len}
                paginate={paginate}
                paginatePrev={paginatePrev}
                paginateNext={paginateNext}
                page={page}
              />
              <Videogames cards={cards} fn={fn} />
              <Pagination
                len={len}
                paginate={paginate}
                paginatePrev={paginatePrev}
                paginateNext={paginateNext}
                page={page}
              />
            </>
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </>
  );
}

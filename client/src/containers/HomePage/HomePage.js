import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Loading from "../../components/Loading/Loading";
import LoadingSpiderman from "../../components/LoadingSpiderman/LoadingSpiderman";
import NavBar from "../../components/NavBar/NavBar";
import NotFound from "../../components/NotFound/NotFound";
import { Pagination } from "../../components/Pagination/Pagination";
import Videogames from "../../components/Videogames/Videogames";
import { deleteVideogame, getVideogames } from "../../redux/actions/actions";
import { Filter } from "../Filter/Filter";
import Modal from "../Modal/Modal";

import styles from "./homePage.module.css";

export default function HomePage() {
  let videogames = useSelector((state) => state.getVideogames);
  let videogamesVier = useSelector((state) => state.videogamesVier);

  // Modal to update
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState({});

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [range, setRange] = useState(15);

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  let videogames_ = videogamesVier;

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

  const handleDelete = (id, name) => {
    dispatch(deleteVideogame(id));
    dispatch(getVideogames());
    alert(`Videogame ${name} has been deleted`);
    console.log(id);
  };

  const handleModal = (value, card) => {
    setModalOpen(value);
    setModalCard(card);
    console.log(card);
    console.log(value);
  };

  return (
    <>
      {videogames.length === 0 ? (
        <LoadingSpiderman />
      ) : (
        <>
          <NavBar />

          {modalOpen ? (
            <Modal setOpenModal={setModalOpen} values={modalCard} />
          ) : (
            <div className={styles.container}>
              <div className={styles.homePage}>
                <div className={styles.filter}>
                  <Filter paginate={paginate} />
                </div>
                <div className={styles.videogames}>
                  <>
                    <>
                      {videogamesVier.length !== 0 ? (
                        <>
                          <h2>Videogames: </h2>
                          <Pagination
                            len={len}
                            paginate={paginate}
                            paginatePrev={paginatePrev}
                            paginateNext={paginateNext}
                            page={page}
                          />
                          <Videogames
                            cards={cards}
                            fn={fn}
                            handleDelete={handleDelete}
                            handleModal={handleModal}
                          />
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
                    </>
                  </>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

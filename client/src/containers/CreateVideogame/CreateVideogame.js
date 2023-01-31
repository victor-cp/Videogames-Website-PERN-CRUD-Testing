import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getGenres, createVideogame } from "../../redux/actions/actions";
import styles from "./createVideogame.module.css";

export const CreateVideogame = () => {
  const dispacth = useDispatch();

  const [errors, setErrors] = React.useState({});
  const [input, setInput] = React.useState({
    name: "",
    description: "",
    release_date: "",
    rating: 0,
    image: "",
    platforms: [],
    genres: [],
  });

  const _platforms = [
    "PC",
    "iOS",
    "Android",
    "macOS",
    "PlayStation 4",
    "PlayStation 5",
    "Xbox",
  ];

  React.useEffect(() => {
    // dispacth(getGenres());
  }, []);

  const genres = useSelector((state) => state.genres);

  const removeItemOnce = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const changeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name);
    // console.log(typeof value);
    if (name === "genres" || name === "platforms") {
      // if (input.find((elem) => elem === value) === value) {
      if (input[name].find((elem) => elem === value) === undefined) {
        setInput({ ...input, [name]: input[name].concat(value) });
      } else {
        removeItemOnce(input[name], value);
      }

      console.log(input);
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validations
    const err = {};
    if (!input.name) err.name = "Insert name";
    if (!input.description) err.description = "Insert description";
    if (!input.release_date) err.release_date = "Insert release date";
    if (input.platforms.length === 0)
      err.platfomrs = "Insert at least one of the options";
    if (input.genres.length === 0)
      err.genres = "Insert at least one of the options";
    setErrors(err);
    if (Object.keys(err).length !== 0) {
      return;
    }

    // validate();

    // console.log(errors);

    console.log("insertado");
    dispacth(createVideogame(input));
    setInput({
      name: "",
      description: "",
      release_date: "",
      image: "",
      rating: 0,
      platforms: [],
      genres: [],
    });

    alert("Game craeted correctly! :D");
    window.location.reload(true);
  };

  // const validate = () => {
  //   const err = {};
  //   console.log(input);
  //   if (!input.name) err.name = "Name is required";
  //   if (!input.description) err.description = "Insertar descripción";
  //   if (!input.release_date) err.release_date = "Insertar fecha de lanzamiento";

  //   console.log(err);
  //   setErrors(err);
  // };

  return (
    <div>
      <NavBar />
      <div className={styles.create}>
        <h1>Create a videogame</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.main_container}>
            <div className={styles.item_one}>
              <h2>Complete all fields</h2>
              <hr className={styles.h2}></hr>
              <div>
                <label>* Game Name:</label>
                <input
                  type="text"
                  name="name"
                  className={styles.form_input}
                  value={input.name}
                  onChange={changeInput}
                />
              </div>
              <p className={styles.error}>{errors.name}</p>

              <div>
                <label>* Description:</label>
                <textarea
                  type="text"
                  name="description"
                  className={styles.form_textarea}
                  value={input.description}
                  onChange={changeInput}
                />
              </div>
              <p className={styles.error}>{errors.description}</p>

              <div className={styles.form_label_date}>
                <label>* Release date: </label>
                <input
                  type="date"
                  name="release_date"
                  className={styles.form_date}
                  value={input.release_date}
                  onChange={changeInput}
                />
              </div>
              <p className={styles.error}>{errors.release_date}</p>

              <div>
                <label>* Rating: {input.rating}</label>
                <input
                  type="range"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.01"
                  className={styles.slider}
                  value={input.rating}
                  onChange={changeInput}
                />
              </div>
              <div>
                <label>Image URL:</label>
                <input
                  type="text"
                  name="image"
                  className={styles.form_input}
                  value={input.image}
                  onChange={changeInput}
                ></input>
              </div>
            </div>
            <div className={styles.item_two}>
              <label>* Platforms:</label>
              <div className={styles.platfomrs}>
                {_platforms.map((platform) => (
                  <label className={styles.container} key={platform}>
                    {platform}
                    <input
                      type="checkbox"
                      name="platforms"
                      value={platform}
                      onChange={changeInput}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                ))}
              </div>
              <p className={styles.error}>{errors.platfomrs}</p>
            </div>
            <div className={styles.item_three}>
              <label>* Genres:</label>
              <div className={styles.platfomrs} key="plat">
                {genres.map((genre) => (
                  <label className={styles.container} key={genre.name}>
                    {genre.name === "Massively Multiplayer"
                      ? "M. Multiplayer"
                      : genre.name}
                    <input
                      type="checkbox"
                      name="genres"
                      value={genre.name}
                      onChange={changeInput}
                    ></input>
                    <span className={styles.checkmark}></span>
                  </label>
                ))}
              </div>
              <p className={styles.error}>{errors.genres}</p>
            </div>

            <div className={styles.item_four}>
              <button className={styles.submit} type="submit" name="btn">
                Add
              </button>

              <span></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

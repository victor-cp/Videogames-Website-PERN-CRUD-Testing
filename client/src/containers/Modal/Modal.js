import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./modal.css";
import styles from "./modal.module.css";
import { updateVideogame } from "../../redux/actions/actions";

import notFound from "../../static/imagens/notFound.PNG";

function Modal({ setOpenModal, values }) {
  const [input, setInput] = useState({
    name: values.name,
    description: values.description,
    release_date: values.release_date,
    rating: values.rating,
    image: values.image,
    platforms: values.platforms,
    genres: values.genres,
  });
  const dispacth = useDispatch();

  const [image, setImage] = useState(values.image);

  const handlePrev = (img) => {
    setImage(img);
  };

  const _platforms = [
    "PC",
    "iOS",
    "Android",
    "macOS",
    "PlayStation4",
    "PlayStation5",
    "Xbox",
  ];

  useEffect(() => {}, []);

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
    console.log(typeof value);
    if (name === "platforms") {
      // if (input.find((elem) => elem === value) === value) {
      if (input[name].find((elem) => elem === value) === undefined) {
        setInput({ ...input, [name]: input[name].concat(value) });
      } else {
        removeItemOnce(input[name], value);
      }
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("actualizado");
    dispacth(updateVideogame(values.id, input));
    setInput({
      name: "",
      description: "",
      release_date: "",
      image: "",
      rating: 0,
      platforms: [],
      genres: [],
    });

    alert("Game updated successfully! :D");
    window.location.reload(true);
  };

  return (
    <>
      <div className={styles.title}>
        <h1>Update {input.name}</h1>
        <div className={styles.create}>
          {/* <form onChange={changeInput} onSubmit={handleSubmit}>  */}
          <div className={styles.divMain1}>
            <form onChange={changeInput} onSubmit={handleUpdate}>
              <div className={styles.main_container}>
                <div className={styles.item_one}>
                  <h2>Update fields</h2>
                  <hr className={styles.h2}></hr>
                  <div>
                    <label>Game Name:</label>
                    <input
                      type="text"
                      name="name"
                      className={styles.form_input}
                      value={input.name}
                    />
                  </div>

                  <div>
                    <label>Description:</label>
                    <textarea
                      type="text"
                      name="description"
                      className={styles.form_textarea}
                      value={input.description}
                    />
                  </div>
                </div>
                <div className={styles.item_two}>
                  <div className={styles.form_label_date}>
                    <label>Release date: </label>
                    <input
                      type="date"
                      name="release_date"
                      className={styles.form_date}
                      value={input.release_date}
                    />
                  </div>

                  <div>
                    <label>Rating: {input.rating}</label>
                    <input
                      type="range"
                      name="rating"
                      min="0"
                      max="5"
                      step="0.01"
                      className={styles.slider}
                      value={input.rating}
                    />
                  </div>
                  <div>
                    <label>Image URL:</label>
                    <input
                      type="text"
                      name="image"
                      className={styles.form_input}
                      value={input.image}
                    ></input>
                  </div>
                  <label>Platforms:</label>
                  <div className={styles.platfomrs}>
                    {_platforms.map((platform) => (
                      <label className={styles.container}>
                        {platform}
                        <input
                          id={`${platform}`}
                          type="checkbox"
                          name="platforms"
                          value={platform}
                          defaultChecked={values.platforms.includes(platform)}
                          // defaultChecked={}
                        />
                        <span className={styles.checkmark}></span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.item_four}>
                  <button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    className={styles.cancel}
                  >
                    Cancel
                  </button>
                  <span></span>
                  <button className={styles.submit} type="submit">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.divMain2}>
            <button
              className={styles.preview}
              onClick={() => handlePrev(input.image)}
            >
              {" "}
              Preview
            </button>
            {image ? (
              <img className={styles.image_preview} src={image} alt="" />
            ) : (
              <img className={styles.image_notFound} src={notFound} alt="" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;

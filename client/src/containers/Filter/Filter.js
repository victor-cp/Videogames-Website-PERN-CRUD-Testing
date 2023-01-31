import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filter, order } from "../../redux/actions/actions";
import styles from "./filter.module.css";

export const Filter = ({ paginate }) => {
  const dispatch = useDispatch();

  // States
  const [state, setState] = useState({
    check: "default",
  });
  const [state_2, setState_2] = useState({
    check_2: "both",
  });

  let { check } = state;
  let { check_2 } = state_2;

  // Order
  const handleOrder = (e) => {
    let { name, value } = e.target;
    setState({ [name]: value });
    paginate(e, 1);
  };

  // Filter
  const handleFilter = async (e) => {
    let { name, value } = e.target;
    setState_2({ [name]: value });
    paginate(e, 1);
  };

  useEffect(() => {
    dispatch(filter(state_2.check_2));
    dispatch(order(state.check));
  }, [state, state_2]);

  return (
    <>
      <div>
        <div>
          <div className={styles.filter}>
            <label>Order:</label>
            <hr></hr>
            <div className={styles.radio_toolbar}>
              <input
                id="test0"
                type="radio"
                name="check"
                value="default"
                checked={check === "default"}
                onChange={handleOrder}
              />
              <label htmlFor="test0">Default</label>
            </div>

            <span>By Name</span>
            <div className={styles.radio_toolbar}>
              <input
                id="test"
                type="radio"
                name="check"
                value="asc_name"
                checked={check === "asc_name"}
                onChange={handleOrder}
              />
              <label htmlFor="test">A - Z</label>

              <input
                id="test1"
                type="radio"
                name="check"
                value="des_name"
                checked={check === "des_name"}
                onChange={handleOrder}
              />
              <label htmlFor="test1">Z - A</label>
            </div>
            <span>By Rating</span>
            <div className={styles.radio_toolbar}>
              <input
                id="test2"
                type="radio"
                name="check"
                value="asc_rating"
                checked={check === "asc_rating"}
                onChange={handleOrder}
              />
              <label htmlFor="test2">Asc. Rating</label>

              <input
                id="test3"
                type="radio"
                name="check"
                value="des_rating"
                checked={check === "des_rating"}
                onChange={handleOrder}
              />
              <label htmlFor="test3">Des. Rating</label>
            </div>
          </div>

          <div className={styles.filter}>
            <label>Filter:</label>
            <hr></hr>
            <div className={styles.radio_toolbar}>
              <div>
                <input
                  id="test4"
                  type="radio"
                  name="check_2"
                  value="both"
                  checked={check_2 === "both"}
                  onChange={handleFilter}
                />
                <label htmlFor="test4">Both</label>
              </div>
              <div>
                <input
                  id="test5"
                  type="radio"
                  name="check_2"
                  value="api"
                  checked={check_2 === "api"}
                  onChange={handleFilter}
                />
                <label htmlFor="test5">Api</label>
              </div>
              <div>
                <input
                  id="test6"
                  type="radio"
                  name="check_2"
                  value="db"
                  checked={check_2 === "db"}
                  onChange={handleFilter}
                />
                <label htmlFor="test6">Db</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

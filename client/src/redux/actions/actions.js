import { ActionTypes } from "../constants/action-types";
import axios from "axios";

export const getGenres = () => {
  return async (dispacth) => {
    const result = await axios.get("/genres");
    return dispacth({
      type: ActionTypes.GET_GENRES,
      payload: result.data,
    });
  };
};

export const getVideogames = () => {
  return async (dispacth) => {
    const result = await axios.get("/videogames");
    return dispacth({
      type: ActionTypes.GET_VIDEOGAMES,
      payload: result.data,
    });
  };
};

export const createVideogame = (input) => {
  return async (dispacth) => {
    const json = JSON.stringify(input);
    const customConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const result = await axios.post("/videogame", json, customConfig);
    // console.log(result);
    return dispacth({
      type: ActionTypes.CREATE_VIDEOGAME,
      payload: result.data,
    });
  };
};

export const detailVideogame = (id) => {
  return async (dispatch) => {
    const result = await axios.get(`/videogame/${id}`);
    return dispatch({
      type: ActionTypes.VIDEOGAME_DETAIL,
      payload: result.data,
    });
  };
};

export const searchVideogame = (name) => {
  return async (dispacth) => {
    const result = await axios.get(`/videogames?name=${name}`);
    return dispacth({
      type: ActionTypes.SEARCH_VIDEOGAMES,
      payload: result.data,
    });
  };
};

export const filter = (value) => {
  return async (dispatch, getState) => {
    let videogamesOrder;

    if (value === "api") {
      videogamesOrder = getState().getVideogames.filter((videogame) => {
        return videogame.source === "api";
      });
    }
    if (value === "db") {
      videogamesOrder = getState().getVideogames.filter((videogame) => {
        return videogame.source === "db";
      });
    }
    if (value === "both") {
      videogamesOrder = getState().getVideogames;
    }

    return dispatch({
      type: ActionTypes.FILTER_VIDEOGAMES,
      payload: {
        videogamesVier: videogamesOrder,
        value,
      },
    });
  };
};

export const order = (value) => {
  return async (dispacth, getState) => {
    const videogamesVier = getState().videogamesVier.slice();
    let videogamesOrder = [];

    let videogames = videogamesVier;

    if (value === "asc_name") {
      videogamesOrder = videogames.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        return 0;
      });
    }
    if (value === "des_name") {
      videogamesOrder = videogames.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) return 1;
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        return 0;
      });
    }
    if (value === "asc_rating") {
      videogamesOrder = videogames.sort((a, b) => a.rating - b.rating);
    }
    if (value === "des_rating") {
      videogamesOrder = videogames.sort((a, b) => b.rating - a.rating);
    }
    if (value === "default") {
      videogamesOrder = videogames;
    }
    return dispacth({
      type: ActionTypes.ORDER_VIDEOGAMES,
      payload: {
        videogamesVier: videogamesOrder,
        value,
      },
    });
  };
};

//////////////////// ADITIONAL //////////

export const deleteVideogame = (id) => {
  return async () => {
    const result = await axios.delete(`/videogame/${id}`);
    return result;
  };
};

export const updateVideogame = (id, input) => {
  return async () => {
    const json = JSON.stringify(input);
    const customConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const result = await axios.put(`/videogame/${id}`, json, customConfig);
    return result;
  };
};

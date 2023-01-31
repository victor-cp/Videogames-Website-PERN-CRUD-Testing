import { ActionTypes } from "../constants/action-types";

const initialState = {
  genres: [],
  getVideogames: [],
  createVideogame: {},
  searchVideogames: [],
  videogameDetail: [],
  order: "default",
  filter: "both",
  videogamesVier: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.GET_GENRES:
      // console.log(action.payload);
      return {
        ...state,
        genres: payload,
      };
    case ActionTypes.CREATE_VIDEOGAME:
      return {
        ...state,
        createVideogame: payload,
      };
    case ActionTypes.GET_VIDEOGAMES:
      return {
        ...state,
        getVideogames: payload,
        videogamesVier: payload,
      };
    case ActionTypes.SEARCH_VIDEOGAMES:
      return {
        ...state,
        searchVideogames: payload,
      };
    case ActionTypes.ORDER_VIDEOGAMES:
      return {
        ...state,
        videogamesVier: payload.videogamesVier,
        order: payload.value,
      };
    case ActionTypes.FILTER_VIDEOGAMES:
      return {
        ...state,
        videogamesVier: payload.videogamesVier,
        filter: payload.value,
      };
    case ActionTypes.VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: payload,
      };
    case ActionTypes.DELETE_VIDEOGAME:
      return {
        ...state,
        videogamesVier: payload,
      };
    default:
      return state;
  }
}

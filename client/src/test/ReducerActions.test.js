/**
 * @jest-environment node
 */
import rootReducer from "../redux/reducers/reducer";
import * as actions from "../redux/actions/actions";

import thunk from "redux-thunk";
import nodeFetch from "node-fetch";
import configureStore from "redux-mock-store";

global.fetch = nodeFetch;

describe("REDUCER / ACTIONS - TEST --------------------------------------------------------------------------------------------------------------------------------", () => {
  it("GET VIDEOGAMES - Exactly 100 RAWG API games must be received", async () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ storeName: "" });
    try {
      // Get all videogames API & BD
      const response = await store.dispatch(actions.getVideogames());
      expect(response.type).toBe("GET_VIDEOGAMES");
      // Filter only api's videogames
      const res = response.payload.filter((vid) => {
        return vid.source === "api";
      });
      expect(res.length).toEqual(100);
    } catch (error) {
      console.error(error);
      expect(error).toBeUndefined();
    }
  }, 30000);

  it("GET GENRES - Exactly 19 genres must be received from the /genres API endpoint", async () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ storeName: "" });
    try {
      const response = await store.dispatch(actions.getGenres());
      expect(response.payload.length).toEqual(19);
      expect(response.type).toBe("GET_GENRES");
    } catch (err) {
      console.error(err);
      expect(err).toBeUndefined();
    }
  });

  it("GET DETAIL VIDEOGAME - Get from the API an object with the keys: name, description, release_date, image, rating, description, platformrs, genres", async () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ storeName: "" });

    const id = 1;

    try {
      // Check the API Videogame with id = 1
      const response = await store.dispatch(actions.detailVideogame(id));
      expect(Object.keys(response.payload)).toEqual([
        "id",
        "name",
        "release_date",
        "image",
        "rating",
        "description",
        "platforms",
        "genres",
      ]);
      expect(response.type).toBe("VIDEOGAME_DETAIL");
    } catch (err) {
      console.error(err);
      expect(err).toBeUndefined();
    }
  });

  it("GET SEARCH - The reducer should get an array of videogames by name", async () => {
    const state = {
      searchVideogames: [],
    };
    const payload = "auto";

    const mockStore = configureStore([thunk]);
    const store = mockStore({ storeName: "" });

    // Create a new Videogame
    const response = await store.dispatch(actions.searchVideogame(payload));
    const createGame = rootReducer({ ...state }, response);
    expect(createGame.searchVideogames.length).toEqual(20);
  });

  it("POST CREATE VIDEOGAME - The reducer should add a videogame ('object') to 'createVideogame' when the case is 'CREATE_VIDEOGAME' and the message recieved should be 'Create Successfully'. ", async () => {
    const state = {
      createVideogame: {},
    };
    const payload = {
      name: "Game1",
      description: "Description1",
      release_date: "1-1-1",
      image: "",
      rating: 0,
      platforms: ["PC"],
      genres: ["Action"],
    };

    const mockStore = configureStore([thunk]);
    const store = mockStore({ storeName: "" });
    // Create a new Videogame
    const response = await store.dispatch(actions.createVideogame(payload));
    const createGame = rootReducer({ ...state }, response);
    // Delete the Videogame created
    await store.dispatch(
      actions.deleteVideogame(createGame.createVideogame.id)
    );
    expect(createGame).not.toEqual(state);
    expect(createGame.createVideogame.message).toEqual("Create Successfully");
  });
});

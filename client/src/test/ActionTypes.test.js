import { ActionTypes } from "../redux/constants/action-types";

describe("ACTION TYPES - TEST --------------------------------------------------------------------------------------------------------------------------------", () => {
  it("You should declare and export the variables CREATE_VIDEOGAME", () => {
    expect(ActionTypes.CREATE_VIDEOGAME).toBeDefined();
    expect(ActionTypes.CREATE_VIDEOGAME).toEqual("CREATE_VIDEOGAME");
  });

  it(" ```````` DELETE_VIDEOGAME", () => {
    expect(ActionTypes.DELETE_VIDEOGAME).toBeDefined();
    expect(ActionTypes.DELETE_VIDEOGAME).toEqual("DELETE_VIDEOGAME");
  });
  it(" ```````` FILTER_VIDEOGAMES", () => {
    expect(ActionTypes.FILTER_VIDEOGAMES).toBeDefined();
    expect(ActionTypes.FILTER_VIDEOGAMES).toEqual("FILTER_VIDEOGAMES");
  });
  it(" ```````` GET_GENRES", () => {
    expect(ActionTypes.GET_GENRES).toBeDefined();
    expect(ActionTypes.GET_GENRES).toEqual("GET_GENRES");
  });
  it(" ```````` GET_VIDEOGAMES", () => {
    expect(ActionTypes.GET_VIDEOGAMES).toBeDefined();
    expect(ActionTypes.GET_VIDEOGAMES).toEqual("GET_VIDEOGAMES");
  });
  it(" ```````` ORDER_VIDEOGAMES", () => {
    expect(ActionTypes.ORDER_VIDEOGAMES).toBeDefined();
    expect(ActionTypes.ORDER_VIDEOGAMES).toEqual("ORDER_VIDEOGAMES");
  });
  it(" ```````` SEARCH_VIDEOGAMES", () => {
    expect(ActionTypes.SEARCH_VIDEOGAMES).toBeDefined();
    expect(ActionTypes.SEARCH_VIDEOGAMES).toEqual("SEARCH_VIDEOGAMES");
  });
  it(" ```````` VIDEOGAME_DETAIL", () => {
    expect(ActionTypes.VIDEOGAME_DETAIL).toBeDefined();
    expect(ActionTypes.VIDEOGAME_DETAIL).toEqual("VIDEOGAME_DETAIL");
  });
});

import { configure, mount } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { CreateVideogame } from "../containers/CreateVideogame/CreateVideogame";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import NavBar from "../components/NavBar/NavBar";

configure({ adapter: new Adapter() });

jest.mock("../redux/actions/actions", () => ({
  CREATE_VIDEOGAME: "CREATE_VIDEOGAME",
  createVideogame: (payload) => ({
    type: "CREATE_VIDEOGAME",
    payload: {
      ...payload,
      id: 6,
    },
  }),
}));

// const spy = jest.spyOn(redux, "useSelector");
// spy.mockReturnValue({ genres: ["Action, Golf"] });

describe("CREATE VIDEOGAME - TEST --------------------------------------------------------------------------------------------------------------------------------", () => {
  const state = {
    input: {
      name: "",
      description: "",
      release_date: "",
      rating: 5,
      image: "",
      platforms: [],
      genres: [],
    },
    genres: ["Action", "Golf"],
  };
  const mockStore = configureStore([thunk]);
  //   const { CREATE_VIDEOGAME } = actions;

  describe("Form structure", () => {
    let createVideogame;
    let store = mockStore(state);
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
      createVideogame = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/create"]}>
            <CreateVideogame />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Should have <NavBar /> on the top", () => {
      expect(createVideogame.find(NavBar)).toHaveLength(1);
    });
    it("Should have 1 form (apart from the NavBar form)", () => {
      expect(createVideogame.find("form")).toHaveLength(2);
    });
    // 8
    // //////////////////////////////////////////////////////////////////
    it('It should render a label with the text "* Game Name:"', () => {
      expect(createVideogame.find("label").at(0).text()).toEqual(
        "* Game Name:"
      );
    });
    it('It should render an input of type text with property "name" equal to "name"', () => {
      expect(createVideogame.find('input[name="name"]')).toHaveLength(1);
      expect(createVideogame.find('input[name="name"]').props().type).toEqual(
        "text"
      );
    });
    // //////////////////////////////////////////////////////////////////
    it('It should render a label with the text "* Description:"', () => {
      expect(createVideogame.find("label").at(1).text()).toEqual(
        "* Description:"
      );
    });
    it('It should render a textarea of type text with property "description" equal to "description"', () => {
      expect(createVideogame.find('textarea[name="description"]')).toHaveLength(
        1
      );
      expect(createVideogame.find("textarea").at(0).props().type).toEqual(
        "text"
      );
    });
    // //////////////////////////////////////////////////////////////////
    it('It should render a label with the text "* Release date: "', () => {
      expect(createVideogame.find("label").at(2).text()).toEqual(
        "* Release date: "
      );
    });
    it('It should render an input of type text with property "name" equal to "release_date" and "type" equal to "date"', () => {
      expect(createVideogame.find('input[name="release_date"]')).toHaveLength(
        1
      );
      expect(
        createVideogame.find('input[name="release_date"]').props().type
      ).toEqual("date");
    });
    // //////////////////////////////////////////////////////////////////
    it('It should render a label with the text "* Rating: {rating}"', () => {
      expect(createVideogame.find("label").at(3).text()).toEqual("* Rating: 0");
    });
    it('It should render an input of type text with property "name" equal to "rating" and "type" equal to "range"', () => {
      expect(createVideogame.find('input[name="rating"]')).toHaveLength(1);
      expect(createVideogame.find('input[name="rating"]').props().type).toEqual(
        "range"
      );
    });
    // //////////////////////////////////////////////////////////////////
    it('It should render a label with the text "Image URL:"', () => {
      expect(createVideogame.find("label").at(4).text()).toEqual("Image URL:");
    });
    it('It should render an input of type text with property "name" equal to "image" and "type" equal to "text"', () => {
      expect(createVideogame.find('input[name="image"]')).toHaveLength(1);
      expect(createVideogame.find('input[name="image"]').props().type).toEqual(
        "text"
      );
    });
    // //////////////////////////////////////////////////////////////////
    it('It should render a button with the text "Add" with "name" to equal "btn" and "type" to equal "submit"', () => {
      expect(createVideogame.find('button[name="btn"]').text()).toEqual("Add");
      expect(createVideogame.find('button[name="btn"]')).toHaveLength(1);
      expect(createVideogame.find('button[name="btn"]').props().type).toEqual(
        "submit"
      );
    });
  });

  describe("State handling", () => {
    let useState, useStateSpy, createTeam;
    let store = mockStore(state);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      createTeam = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/create"]}>
            <CreateVideogame />
          </MemoryRouter>
        </Provider>
      );
    });

    it("It should correctly set the values of the initial state of the component (name, description, release_date, rating, image, platforms, genres)", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: "",
        description: "",
        release_date: "",
        rating: 0,
        image: "",
        platforms: [],
        genres: [],
      });
    });

    describe("Name input", () => {
      it('It should change state when changes the value of the input: "name', () => {
        createTeam.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "Game 1 by: Victor" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "Game 1 by: Victor",
          description: "",
          release_date: "",
          rating: 0,
          image: "",
          platforms: [],
          genres: [],
        });
      });
    });

    describe("Description input", () => {
      it('It should change state when changes the value of the teaxtarea: "description"', () => {
        createTeam.find('textarea[name="description"]').simulate("change", {
          target: { name: "description", value: "Description." },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          description: "Description.",
          release_date: "",
          rating: 0,
          image: "",
          platforms: [],
          genres: [],
        });
      });
    });

    describe("Release date input", () => {
      it('It should change state when changes the value of the input: "release_date"', () => {
        createTeam.find('input[name="release_date"]').simulate("change", {
          target: { name: "release_date", value: "1-1-1" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          description: "",
          release_date: "1-1-1",
          rating: 0,
          image: "",
          platforms: [],
          genres: [],
        });
      });
    });

    describe("Rating input", () => {
      it('It should change state when changes the value of the input: "rating"', () => {
        createTeam.find('input[name="rating"]').simulate("change", {
          target: { name: "rating", value: 5 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          description: "",
          release_date: "",
          rating: 5,
          image: "",
          platforms: [],
          genres: [],
        });
      });
    });
  });
});

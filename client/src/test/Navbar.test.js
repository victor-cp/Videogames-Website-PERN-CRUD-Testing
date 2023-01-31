import React from "react";
import { Link, NavLink } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Navbar from "../components/NavBar/NavBar";

configure({ adapter: new Adapter() });

describe("NAVBAR - TEST -----------------------------------------------------------------------------------------------------------------------------------------", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  it("Should render Three <Link />", () => {
    expect(wrapper.find(Link)).toHaveLength(3);
  });
  it('The first Link should have the text "Main" and change the path to "/".', () => {
    expect(wrapper.find(Link).at(0).prop("to")).toEqual("/");
    expect(wrapper.find(Link).at(0).text()).toEqual("Main");
  });
  it('The second Link should have the text "Home" and change the path to "/home".', () => {
    expect(wrapper.find(Link).at(1).prop("to")).toEqual("/home");
    expect(wrapper.find(Link).at(1).text()).toEqual("Home");
  });
  it('The third Link should have the text "Create" and change the path to "/create".', () => {
    expect(wrapper.find(Link).at(2).prop("to")).toEqual("/create");
    expect(wrapper.find(Link).at(2).text()).toEqual("Create");
  });

  it("It should render an entry for the subject with the placeholder: `Search videogame...` and type: `text` attributes", () => {
    const inputSubject = wrapper.find("input").at(0);
    expect(inputSubject.props()).toEqual({
      ...inputSubject.props(),
      placeholder: "Search videogame...",
      type: "text",
    });
  });

  it("Should render one Search Bar", () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
});

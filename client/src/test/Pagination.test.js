import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { Pagination } from "../components/Pagination/Pagination";

configure({ adapter: new Adapter() });

describe("PAGINATION - TEST ------------------------------------------------------------------------------------------------------------------------------------", () => {
  let wrapper;
  beforeEach(() => {
    const page = 10;
    wrapper = shallow(<Pagination len={page} />);
  });

  it('The first button should have a text "<<" ', () => {
    expect(wrapper.find("button").at(0).text()).toEqual("<<");
  });
  it("The fifth button should have a number: 4 ", () => {
    expect(wrapper.find("button").at(4).text()).toBe("4");
  });
  it('The last button should have a text ">>" ', () => {
    expect(wrapper.find("button").at(11).text()).toEqual(">>");
  });
});

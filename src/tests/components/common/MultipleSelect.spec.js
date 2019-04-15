import React from "react";
import { mount, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import MultipleSelect from "../../../components/common/MultipleSelect";

configure({ adapter: new Adapter() });

describe("MultipleSelect", () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = mount(
      <MultipleSelect
        label="Tags"
        name="tags"
        selectoptions={['tag1', 'tag2', 'tag3']}
        onChange={() => {}}
        values={['tag2','tag3']}
      />
    );
  });

  it("Renders tags in Multiple Select", async () => {
    expect(wrapper.find("input[name='tags']").props().value).toBe('tag2,tag3');
  });

  it("Allows to click items", async() => {
    // TODO
  })
});

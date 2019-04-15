import React from "react";
import { mount, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import MultipleSelect from "../../../components/common/MultipleSelect";

configure({ adapter: new Adapter() });

describe("MultipleSelect", () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = mount(
      <div data-testid="test-wrapper">
        <MultipleSelect
          label="Tags"
          name="tags"
          selectoptions={['tag1', 'tag2', 'tag3']}
          onChange={() => {}}
          values={['tag2','tag3']}
        />
      </div>
    );
  });

  it("Renders tags in Multiple Select", async () => {
    expect(wrapper.find("input[name='tags']").props().value).toBe('tag2,tag3');
  });
});

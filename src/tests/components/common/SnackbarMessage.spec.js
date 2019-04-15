import React from "react";
import { mount, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import SnackbarMessage, { openSnackbar } from '../../../components/common/SnackbarMessage';

configure({ adapter: new Adapter() });

describe("SnackbarMessage", () => {
  let wrapper;
  beforeEach(async () => {
    wrapper =
      mount(
      <div data-testid="snackbar-test">
        <SnackbarMessage variant='success' handleClose={() => {}}/>
      </div>
    );
  });

  it("Shows message when opening the Snackbar", async () => {
    const message = 'Successfully submitted'
    openSnackbar({ message });
    expect(wrapper.find("div[data-testid='snackbar-test']").text()).toEqual(message);
  });

  it("Clicking the close button closes the snackbar", async() => {
    // TODO
  })
});

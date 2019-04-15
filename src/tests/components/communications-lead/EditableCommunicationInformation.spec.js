import $http from "../../utils/axios";
import React from "react";
import { mount, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import initialState from '../../../store/initialState'
import { LoadStatus } from '../../../constants/loadStatus'
import commsLeadReducer from '../../../reducers/commsLeadReducer'
import EditableCommunicationInformation from '../../../components/communications-lead/EditableCommunicationInformation';
import { Provider } from "react-redux";
import configureStore from "../../../store";

const store = configureStore();

configure({ adapter: new Adapter() });

describe("EditableCommunicationInformation", () => {
  let wrapper;
  let lastCommunication;
  beforeEach(async () => {
    const fetchedCommunications = await $http
      .get(`/commsLead.json`)
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
    const action = {
      type: `GET_COMMS_${LoadStatus.OK}`,
      payload: {
        response: fetchedCommunications
      }
    };
    const newState = commsLeadReducer(initialState.commsLead, action);
    lastCommunication = newState.communications[0];
    wrapper =
      mount(
        <Provider store={store}>
          <EditableCommunicationInformation datelabel='Last Updated' datevalue={lastCommunication.updated} communication={lastCommunication} classes={{}} />
        </Provider>)
      ;
  });

  it("Shows summary", async () => {
    expect(wrapper.find("li[data-testid='summary']").text()).not.toEqual('');
    expect(wrapper.find("li[data-testid='summary']").text()).toEqual(expect.stringContaining(lastCommunication.summary));
  });

  it("Shows form when clicking element", async () => {
    const summary = wrapper.find("li[data-testid='summary']");
    expect(summary.text()).not.toEqual('');
    expect(summary.text()).toEqual(expect.stringContaining(lastCommunication.summary));
    summary.simulate('click');
    expect(wrapper.find("TextField#summary").props().label).toBe("Executive Summary");
  });
});

import axios from 'axios'
axios.defaults.adapter = require('axios/lib/adapters/http')
const $http = axios.create({
  baseURL: 'http://localhost:3000/'
})
import React from "react";
import { mount, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import initialState from '../../../store/initialState'
import { LoadStatus } from '../../../constants/loadStatus'
import commsLeadReducer from '../../../reducers/commsLeadReducer'
import EditableCommunicationInformation from '../../../components/communications-lead/EditableCommunicationInformation';
import { Provider } from "react-redux";
import configureStore from "../../../store";
import EditLastCommunicationForm from '../../../components/communications-lead/EditLastCommunicationForm'

const store = configureStore();

configure({ adapter: new Adapter() });

describe("EditLastCommunicationForm", () => {
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
          <EditLastCommunicationForm communication={lastCommunication} handleCancel={() => {}} handleSubmit={() => {}} />
        </Provider>)
    ;
  });

  it("Shows summary text field", async () => {
    expect(wrapper.find("TextField#summary").props().label).toBe("Executive Summary");
  });
});

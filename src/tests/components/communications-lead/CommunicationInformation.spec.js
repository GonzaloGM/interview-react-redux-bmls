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
import CommunicationInformation from '../../../components/communications-lead/CommunicationInformation'

configure({ adapter: new Adapter() });

describe("CommunicationInformation", () => {
  let wrapper;
  beforeEach(async () => {

  });

  it("Shows summary", async () => {
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
    const communication = newState.communications[0].publish_history[0];
    wrapper =
      mount(
        <CommunicationInformation communication={communication} classes={{}}/>
      );
    expect(wrapper.find("li[data-testid='summary']").text()).not.toEqual('');
    expect(wrapper.find("li[data-testid='summary']").text()).toEqual(expect.stringContaining(communication.summary));
  });
});

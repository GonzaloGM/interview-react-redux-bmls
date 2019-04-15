import $http from "../../utils/axios";
import React from "react";
import { mount, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import CommunicationsAccordion from '../../../components/communications-lead/CommunicationsAccordion'
import initialState from '../../../store/initialState'
import { LoadStatus } from '../../../constants/loadStatus'
import commsLeadReducer from '../../../reducers/commsLeadReducer'

configure({ adapter: new Adapter() });

describe("CommunicationsAccordion", () => {
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
        <CommunicationsAccordion communication={communication} key={communication.created['$date']} />
      );
    expect(wrapper.find("p[className*='CommunicationsAccordion-heading']").text()).not.toEqual('');
    expect(wrapper.find("p[className*='CommunicationsAccordion-heading']").text()).toEqual(expect.stringContaining(communication.summary));
  });
});

// import $http from "axios/index";
import axios from 'axios'
axios.defaults.adapter = require('axios/lib/adapters/http')
const $http = axios.create({
  baseURL: 'http://localhost:3000/'
})
import { LoadStatus } from "../../constants/loadStatus";
import { UPDATE_LAST_COMM } from "../../constants/commsLeadConstants";
import commsLeadReducer from "../../reducers/commsLeadReducer";
import initialState from "../../store/initialState";

describe("Communications Lead reducer", () => {
  it("Should get communications", async () => {
    const oldCommunications = initialState.commsLead.communications;
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
    const newSummary = newState.summary;
    expect(oldCommunications).toEqual([]);
    expect(newSummary).not.toBe('');
    expect(newSummary).toBe(fetchedCommunications.summary);
  });

  it("Should update last communication", async () => {
    const oldCommunications = initialState.commsLead.communications;
    const fetchedCommunications = await $http
      .get(`/commsLead.json`)
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
    const exampleCommunication = JSON.parse('[{"_id":"5c34d71ee242d406444d3b7a","incident_id":1,"summary":"Example Summary","tags":["Tag 1"],"emails":["example@blameless.com"],"phones":["+1 (909) 584-3610"],"slack_channels":["Channel 1"],"publish_history":[{"summary":"test2","tags":["Old Tag 1","Old Tag 2","Old Tag 3","Old Tag 4"],"emails":["example@blameless.com"],"phones":["+1 (909) 584-3610"],"slack_channels":["Old Channel 1","Old Channel 2"],"created":{"$date":1546966821784}},{"summary":"test1","tags":["Old Tag 1","Old Tag 2"],"emails":["example2@blameless.com"],"phones":["+1 (909) 584-3610"],"slack_channels":["Old Channel 1","Old Channel 2","Old Channel 3"],"created":{"$date":1546966820032}},{"summary":"Test summary","tags":["Tag 1","Tag 2","Tag 3","Tag 4"],"emails":["example@blameless.com","user@blameless.com"],"phones":["+1 (909) 584-3610","+1 (123) 134-3412"],"slack_channels":["Channel 1","Channel 2"],"created":{"$date":1546966821787}}],"is_approved":true,"is_published":true,"is_external":false,"is_deleted":false,"created":1546966814097,"updated":1546966821785,"reminded":1546966814098}]');
    const action = {
      type: UPDATE_LAST_COMM,
      payload: exampleCommunication
    };
    const newState = commsLeadReducer(initialState.commsLead, action);
    const newSummary = newState.communications[0].summary;
    expect(oldCommunications).toEqual([]);
    expect(newSummary).not.toBe('');
    expect(newSummary).not.toBe(fetchedCommunications.summary);
    expect(newSummary).toBe('Example Summary');
  });
});

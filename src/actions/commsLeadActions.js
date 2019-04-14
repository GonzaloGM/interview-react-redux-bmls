import { createActionAsync } from "redux-act-async";
import $http from "axios";
import { GET_COMMS, UPDATE_LAST_COMM } from "../constants/commsLeadConstants";

export const getCommunications = createActionAsync(GET_COMMS, () => {
	return $http
		.get(`/commsLead.json`)
		.then(res => res.data)
		.catch(error => {
			throw error;
		});
});

export const updateLastCommunication = (formValues) => async (dispatch, getState) => {
	let newCommunications = [ ...getState().commsLead.communications ];
	let lastCommunication = newCommunications[0];
	const { summary, tags, emails, phones, slack_channels } = lastCommunication;
	const newPushHistoryEntry = {
		summary,
		tags,
		emails,
		phones,
		slack_channels,
		created: {
			'$date': lastCommunication.updated + lastCommunication.publish_history.length
		}
	};
	lastCommunication = Object.assign(lastCommunication, {
		summary: formValues.summary,
		publish_history: [ ...lastCommunication.publish_history, newPushHistoryEntry ]
	});

	console.log('getState().commsLead.communications', newCommunications);
	dispatch({type: UPDATE_LAST_COMM, payload: newCommunications})
}

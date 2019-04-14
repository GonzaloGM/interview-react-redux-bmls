import { LoadStatus } from "../constants/loadStatus";
import { getCommunications } from "../actions/commsLeadActions";
import { UPDATE_LAST_COMM } from '../constants/commsLeadConstants'

export default (state = {}, action) => {
	switch (action.type) {
		case getCommunications.request.getType():
			return {
				...state,
				commsLeadLoadStatus: LoadStatus.REQUEST
			};
		case getCommunications.ok.getType():
			return {
				...state,
				communications: action.payload.response.communications,
				commsLeadLoadStatus: LoadStatus.OK
			};
		case getCommunications.error.getType():
			return {
				...state,
				commsLeadLoadStatus: LoadStatus.ERROR
			};
		case UPDATE_LAST_COMM:
			return {
				...state,
				communications: action.payload
			}
		default:
			return {
				...state
			};
	}
};

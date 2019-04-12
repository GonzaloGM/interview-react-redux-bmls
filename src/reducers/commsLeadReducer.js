import { LoadStatus } from "../constants/loadStatus";
import { getCommunications } from "../actions/commsLeadActions";

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
		default:
			return {
				...state
			};
	}
};

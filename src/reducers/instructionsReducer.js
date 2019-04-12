import { LoadStatus } from "../constants/loadStatus";
import { getInstructions } from "../actions/instructionsActions";

export default (state = {}, action) => {
	switch (action.type) {
		case getInstructions.request.getType():
			return {
				...state,
				instructionsLoadStatus: LoadStatus.REQUEST
			};
		case getInstructions.ok.getType():
			return {
				...state,
				description: action.payload.response,
				instructionsLoadStatus: LoadStatus.OK
			};
		case getInstructions.error.getType():
			return {
				...state,
				instructionsLoadStatus: LoadStatus.ERROR
			};
		default:
			return {
				...state
			};
	}
};

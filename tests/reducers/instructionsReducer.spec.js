import $http from "axios";
import { LoadStatus } from "../../src/constants/loadStatus";
import instructionsReducer from "../../src/reducers/instructionsReducer";
import initialState from "../../src/store/initialState";

describe("Instructions Reducer", () => {
	it("Should get instructions", async () => {
		const oldDescription = initialState.instructions.description;
		const fetchedDescription = await $http
			.get(`/instructions.md`)
			.then(res => res.data)
			.catch(error => {
				throw error;
			});
		const action = {
			type: `GET_INSTRUCTIONS_${LoadStatus.OK}`,
			payload: {
				response: fetchedDescription
			} 
		};
		const newState = instructionsReducer(initialState.instructions, action);
		const newDescription = newState.description;
		expect(oldDescription).toBe("");
		expect(newDescription).not.toBe(oldDescription);
		expect(newDescription).toBe(fetchedDescription);
	});
});

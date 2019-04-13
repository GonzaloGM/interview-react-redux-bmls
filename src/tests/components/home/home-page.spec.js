import $http from "axios/index";
import React from "react";
import { mount, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import { HomePageTest } from "../../../components/home/home-page";

configure({ adapter: new Adapter() });

describe("Home Page", () => {
	let wrapper;
	beforeEach(async () => {
		const fetchedDescription = await $http
			.get(`/instructions.md`)
			.then(res => res.data)
			.catch(error => {
				throw error;
			});
		wrapper = mount(
			<HomePageTest
				description={fetchedDescription}
				instructionsLoadStatus="OK"
				onGetInstructions={() => {}}
			/>
		);
	});

	it("Renders instructions in Home Page", async () => {
		expect(wrapper.find("ReactMarkdown").length).toBeGreaterThan(0);
	});
});

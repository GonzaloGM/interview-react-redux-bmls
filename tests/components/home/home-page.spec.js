import $http from "axios";
import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { HomePageTest } from "../../../src/components/home/home-page";

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

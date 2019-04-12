import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "./store";
import App from "./App";

import "./styles.scss";

const history = createBrowserHistory();
const store = configureStore();
const rootElement = document.getElementById("root");

render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	rootElement
);

import React, { Suspense, lazy } from "react";
import { compose } from "redux";
import { Route, Switch, withRouter } from "react-router-dom";

const Home = lazy(() => import("./home/home-page"));
const Exercise = lazy(() => import("./exercise/exercise-page"));

const Routes = () => (
	<Suspense fallback="Loading page...">
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/exercise" component={Exercise} />
		</Switch>
	</Suspense>
);

const ComposedComponent = compose(withRouter)(Routes);

export default ComposedComponent;

import React from "react";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuBar from "./components/_menuBar";
import Routes from "./components/_routes";

const styles = () => ({
	main: {
		padding: 5,
		marginTop: 46

	},
	appBar: {
		backgroundColor: "#051c2c",
		padding: 0,
		position: "fixed",
		top: 0
	},
	toolBar: {
		padding: "0 8px"
	},
	logoImg: {
		height: 30,
		padding: "5px 0 0"
	},
	logoContainer: {
		textAlign: "right"
	},
	menuContainer: {
		padding: "5px 0 0"
	}
});

const App = ({ children, classes }) => (
	<div className="App">
		<AppBar
			position="static"
			color="primary"
			classes={{ root: classes.appBar }}>
			<Toolbar variant="dense" classes={{ root: classes.toolBar }}>
				<Grid container spacing={16}>
					<Grid item xs={6}>
						<div className={classes.menuContainer}>
							<MenuBar />
						</div>
					</Grid>
					<Grid item xs={6} className={classes.logoContainer}>
						<img
							className={classes.logoImg}
							alt="Blameless INC"
							src="https://storage.googleapis.com/blameless-showcase/logo.png"
						/>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
		<main className={classes.main}>
			<Routes />
		</main>
	</div>
);

const ComposedComponent = compose(withStyles(styles))(App);

export default ComposedComponent;

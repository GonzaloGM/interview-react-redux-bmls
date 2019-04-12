import React, { Component } from "react";
import PropTypes from "prop-types";
import { LoadStatus } from "../../constants/loadStatus";
import { compose } from "redux";
import { connect } from "react-redux";
import { getInstructions } from "../../actions/instructionsActions";
import ReactMarkdown from "react-markdown";

class HomePage extends Component {
	componentDidMount() {
		const { onGetInstructions } = this.props;
		onGetInstructions();
	}

	render() {
		const { description, instructionsLoadStatus } = this.props;
		if (instructionsLoadStatus === LoadStatus.REQUEST) {
			return <>Loading...</>;
		}

		return (
			<div className="markdown-body">
				<ReactMarkdown source={description} />
			</div>
		);
	}
}

HomePage.propTypes = {
	description: PropTypes.string.isRequired,
	instructionsLoadStatus: PropTypes.string.isRequired
};

const mapStateToProps = ({ instructions }) => {
	return {
		description: instructions.description,
		instructionsLoadStatus: instructions.instructionsLoadStatus
	};
};

const mapDispatchToProps = dispatch => ({
	onGetInstructions: id => dispatch(getInstructions(id))
});

const ComposedComponent = compose()(HomePage);

export const HomePageTest = HomePage;
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ComposedComponent);

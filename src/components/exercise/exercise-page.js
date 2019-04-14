import React, { Component } from "react";
import PropTypes from "prop-types";
import { LoadStatus } from "../../constants/loadStatus";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { getCommunications } from "../../actions/commsLeadActions";
import { Grid } from "@material-ui/core";
import CommunicationsAccordion from '../communications-lead/CommunicationsAccordion'
import EditableCommunicationInformation from '../communications-lead/EditableCommunicationInformation'

const styles = {};

class ExercisePage extends Component {
	componentDidMount() {
		const { onGetCommunications } = this.props;
		onGetCommunications();
	}

	render() {
		const { commsLeadLoadStatus, communications, classes } = this.props;
		if (commsLeadLoadStatus === LoadStatus.REQUEST) {
			return <>Loading...</>;
		}

		let lastCommunication = null;
		let sortedPublishHistory = null;
		if (communications.length) {
			lastCommunication = communications[0];
			sortedPublishHistory = lastCommunication.publish_history.sort((a,b) => b.created['$date'] - a.created['$date']);
		}

		return (
			<>
				<Grid container>
					<Grid item xs={12}>
						{lastCommunication && <EditableCommunicationInformation datelabel='Creation Date' datevalue={lastCommunication.created} communication={lastCommunication} classes={classes} />}
						{communications.length > 0
							? sortedPublishHistory.map((comm, index) => (
									<CommunicationsAccordion communication={comm} datevalue={comm.created['$date']} key={comm.created['$date'] + index + Math.random()} />
							  ))
							: "No communications found."}
					</Grid>
				</Grid>
			</>
		);
	}
}

ExercisePage.propTypes = {
	communications: PropTypes.array.isRequired,
	commsLeadLoadStatus: PropTypes.string.isRequired
};

const mapStateToProps = ({ commsLead }) => {
	return {
		communications: commsLead.communications,
		commsLeadLoadStatus: commsLead.commsLeadLoadStatus
	};
};

const mapDispatchToProps = dispatch => ({
	onGetCommunications: id => dispatch(getCommunications(id))
});

const ComposedComponent = compose(withStyles(styles))(ExercisePage);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ComposedComponent);

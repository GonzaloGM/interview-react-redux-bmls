import React, { Component } from "react";
import PropTypes from "prop-types";
import { LoadStatus } from "../../constants/loadStatus";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { getCommunications } from "../../actions/commsLeadActions";
import { Grid } from "@material-ui/core";

const styles = {};

class JSONPage extends Component {
  componentDidMount() {
    const { onGetCommunications } = this.props;
    onGetCommunications();
  }

  render() {
    const { commsLeadLoadStatus, communications } = this.props;
    if (commsLeadLoadStatus === LoadStatus.REQUEST) {
      return <>Loading...</>;
    }
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            {communications.length > 0
              ? communications.map(comm => (
                <div key={comm.id}>
                  <h2>Communications:</h2>
                  <pre>
											{JSON.stringify(comm, null, 4)}
										</pre>
                </div>
              ))
              : "No communications found."}
          </Grid>
        </Grid>
      </>
    );
  }
}

JSONPage.propTypes = {
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

const ComposedComponent = compose(withStyles(styles))(JSONPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposedComponent);

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import CommunicationInformation from './CommunicationInformation'
import EditLastCommunicationForm from './EditLastCommunicationForm'
import SnackbarMessage, { openSnackbar } from '../common/SnackbarMessage'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  }
});

const editableCommInfoStyles = {
  cursor: 'text'
}

class EditableCommunicationInformation extends Component {
  state = {
    openModal: false
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  handleSubmit = (e) => {
    this.handleClose();
    openSnackbar({ 'message': 'Successfully submitted' });
  }

  render() {
    const { classes, ...otherProps } = this.props;

    return (
      <div>
        <div onClick={this.handleOpen} style={editableCommInfoStyles}>
          <CommunicationInformation {...this.props} />
        </div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
          onClose={this.handleClose}
          {...otherProps}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Edit Communication
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              <EditLastCommunicationForm communication={this.props.communication} handleCancel={this.handleClose} handleSubmit={this.handleSubmit} />
            </Typography>
          </div>
        </Modal>
        <SnackbarMessage variant='success' handleClose={this.handleClose}/>
      </div>
    );
  }
}

EditableCommunicationInformation.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(EditableCommunicationInformation);

export default SimpleModalWrapped;

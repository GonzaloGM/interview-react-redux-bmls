import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import CommunicationInformation from './CommunicationInformation'

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
    open: false
  };

  handleOpen = () => {
    console.log('handleOpen props', this.props);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
          open={this.state.open}
          onClose={this.handleClose}
          {...otherProps}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Edit Communication
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <SimpleModalWrapped />
          </div>
        </Modal>
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

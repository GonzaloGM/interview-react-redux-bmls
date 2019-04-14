import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateLastCommunication } from '../../actions/commsLeadActions'
import MultipleSelect from '../common/MultipleSelect'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class EditLastCommunicationForm extends Component {
  state = {
    summary: this.props.communication.summary,
    tags: this.props.communication.tags,
    emails: this.props.communication.emails,
    phones: this.props.communication.phones,
    slack_channels: this.props.communication.slack_channels
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('EditLastCommunicationForm: form submitted');
    this.props.updateLastCommunication(this.state);
    this.props.handleSubmit();
  }

  render () {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <TextField
            id="summary"
            label="Executive Summary"
            className={classes.textField}
            name="summary"
            value={this.state.summary}
            onChange={this.handleInputChange}
            margin="normal"
          />
        </div>
        <div>
          <MultipleSelect
            label="Tags"
            name="tags"
          />
        </div>
        <div>
          <MultipleSelect
            label="Emails"
            name="emails"
          />
        </div>
        <div>
          <MultipleSelect
            label="Phones"
            name="phones"
          />
        </div>
        <div>
          <MultipleSelect
            label="Slack Channels"
            name="slack_channels"
          />
        </div>
        <br />
        <Button variant="contained" className={classes.button} onClick={this.props.handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" className={classes.button} type="submit">
          Save
        </Button>
      </form>
    )
  }
}

const wrappedForm = withStyles(styles)(EditLastCommunicationForm);

export default connect(null, { updateLastCommunication })(wrappedForm);

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateLastCommunication } from '../../actions/commsLeadActions'

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
    // TODO update state and push history
    this.props.updateLastCommunication(this.state);
    this.props.handleSubmit();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Executive Summary
          <input
            name="summary"
            type="text"
            value={this.state.summary}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <button type="submit" value="Submit">Submit</button>
        <br />
        <button value="Cancel" onClick={this.props.handleCancel}>Cancel</button>
      </form>
    )
  }
}

export default connect(null, { updateLastCommunication })(EditLastCommunicationForm);

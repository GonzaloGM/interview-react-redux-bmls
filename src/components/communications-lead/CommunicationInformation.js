import React from 'react'
import Chip from '@material-ui/core/Chip'
import format from 'date-fns/format';
import './CommunicationInformation.css';

const CommunicationInformation = ({communication, datelabel = 'Publish Date', datevalue, classes, children}) => {
  if (!communication) {
    return <div />
  }
  const creationDate = format(new Date(datevalue || communication.created['$date']), 'YYYY-MM-DD hh:mm:ss Z');
  return (
    <div>
      <ul className="comm-info-list">
        <li data-testid="date"><strong>{datelabel}:</strong> {creationDate}</li>
        <li data-testid="summary"><strong>Summary:</strong> {communication.summary}</li>
        <li data-testid="tags"><strong>Tags:</strong> {communication.tags.map((tag) => <Chip label={tag} key={tag} className={classes.chip} />)}</li>
        <li data-testid="emails"><strong>Emails:</strong> {communication.emails.map((email) => <Chip label={email} key={email} className={classes.chip} />)}</li>
        <li data-testid="phones"><strong>Phones:</strong> {communication.phones.map((phone) => <Chip label={phone} key={phone} className={classes.chip} />)}</li>
        <li data-testid="slack_channels"><strong>Slack Channels:</strong> {communication.slack_channels.map((slack) => <Chip label={slack} key={slack} className={classes.chip} />)}</li>
      </ul>
    </div>
  )
}

export default CommunicationInformation

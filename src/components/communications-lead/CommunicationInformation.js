import React from 'react'
import Chip from '@material-ui/core/Chip'
import format from 'date-fns/format';

const CommunicationInformation = ({communication, datelabel = 'Publish Date', datevalue, classes, children}) => {
  if (!communication) {
    return <div />
  }
  const creationDate = format(new Date(datevalue || communication.created['$date']), 'MM/DD/YYYY h:mm:ss a');
  return (
    <div>
      <ul>
        <li><strong>{datelabel}:</strong> {creationDate}</li>
        <li><strong>Summary:</strong> {communication.summary}</li>
        <li><strong>Tags:</strong> {communication.tags.map((tag) => <Chip label={tag} key={tag} className={classes.chip} />)}</li>
        <li><strong>Emails:</strong> {communication.emails.map((email) => <Chip label={email} key={email} className={classes.chip} />)}</li>
        <li><strong>Phones:</strong> {communication.phones.map((phone) => <Chip label={phone} key={phone} className={classes.chip} />)}</li>
        <li><strong>Slack Channels:</strong> {communication.slack_channels.map((slack) => <Chip label={slack} key={slack} className={classes.chip} />)}</li>
      </ul>
    </div>
  )
}

export default CommunicationInformation

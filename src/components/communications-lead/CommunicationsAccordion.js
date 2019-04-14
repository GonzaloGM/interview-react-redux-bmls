import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import format from 'date-fns/format'
import CommunicationInformation from './CommunicationInformation'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function CommunicationsAccordion(props) {
  const { classes, communication } = props;
  const creationDate = format(new Date(communication.created['$date']), 'YYYY-MM-DD hh:mm:ss Z');
  // if (!communication) {
  //   return <div />
  // }
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>({creationDate}) - {communication.summary} </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CommunicationInformation communication={communication} classes={classes}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

CommunicationsAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const MenuBar = memo(({ classes }) => (
//   <Grid container spacing={16} alignItems="center">
//     <Link className={classes.menuItem} to="/">
//       Instructions
//     </Link>
//     |
//     <Link className={classes.menuItem} to="/exercise">
//       Exercise
//     </Link>
//     |
//     <Link className={classes.menuItem} to="/json">
//       JSON
//     </Link>
//   </Grid>
// ));

const ComposedComponent = compose(withStyles(styles))(CommunicationsAccordion);

export default ComposedComponent;

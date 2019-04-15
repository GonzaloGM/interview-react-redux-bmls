import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class MultipleSelect extends Component {
  // state = {
  //   selectvalues: this.props.values || [],
  // };

  handleChange = event => {
    this.props.onChange(event);
    // this.setState({ selectvalues: event.target.value });
  };

  render () {
    const { classes, name, label, selectoptions, values } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>
          <Select
            multiple
            name={name}
            value={values}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {selectoptions.map(opt => (
              <MenuItem key={opt} value={opt}>
                <Checkbox checked={values.indexOf(opt) > -1} />
                <ListItemText primary={opt} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const MultipleSelectTest = MultipleSelect;
export default withStyles(styles, { withTheme: true })(MultipleSelect);

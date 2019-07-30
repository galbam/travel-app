import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import InspirationBar from '../Food/InspirationBar'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});


export class Sidebar extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
    if(value === 0){
      this.props.filterRestaurants('');
      this.setState({filterVenues:this.props.filterRestaurants})
    }
    else if(value === 1){
      this.props.filterExcursions('');
      this.setState({filterVenues:this.props.filterExcursions})
    }
    else if(value === 2){
      this.props.filterAccommodations('');
      this.setState({filterVenues:this.props.filterAccommodations})
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            // scrollable
            scrollButtons="auto"
          >
            <Tab label="Foods and Drinks" />
            <Tab label="Excursion/Sightseeing" />
            <Tab label="Accommodation" />
          </Tabs>
        </AppBar>
        {value === 0 &&
        <TabContainer>
          <InspirationBar filterVenues={this.state.filterVenues}
            filteredVenues={this.props.filteredVenues}
            listItemClick={this.props.listItemClick}
            selectVenue={this.props.selectVenue} />
        </TabContainer>
        }
        {value === 1 &&
        <TabContainer>
          <InspirationBar filterVenues={this.state.filterVenues}
            filteredVenues={this.props.filteredVenues}
            listItemClick={this.props.listItemClick}
            selectVenue={this.props.selectVenue} />
        </TabContainer>}
        {value === 2 &&
        <TabContainer>
          <InspirationBar filterVenues={this.state.filterVenues}
            filteredVenues={this.props.filteredVenues}
            listItemClick={this.props.listItemClick}
            selectVenue={this.props.selectVenue} />
        </TabContainer>}
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);

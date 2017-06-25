/* eslint-disable no-confusing-arrow */

import React from 'react';
import FontAwesome from 'react-fontawesome';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import { sortByMail } from '../../../modules/sorting.js';

export default class FriendSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friendNameFilter: '' };
  }

  indexOfById(friends, friend) {
    for (let i = 0, len = friends.length; i < len; i += 1) {
      if (friends[i]._id === friend._id) {
        return i;
      }
    }
    return -1;
  }

  friendIsSelected(friend, selectedFriends) {
    return this.indexOfById(selectedFriends, friend) < 0;
  }

  handleNameFilter(event) {
    this.setState({ friendNameFilter: event.target.value });
  }

  nameFilter(friend) {
    const nameFilter = this.state.friendNameFilter.toLowerCase();
    return nameFilter.trim() === '' ||
      (friend.firstname.toLowerCase().includes(nameFilter) ||
        friend.lastname.toLowerCase().includes(nameFilter));
  }

  renderFriends(onAdd, friends, selectedFriends) {
    return friends.length > 0
      ? <List dense={true}>
          {friends.filter(this.nameFilter.bind(this)).sort(sortByMail).map(friend => (
            <ListItem key={friend._id}>
              <ListItemText primary={`${friend.firstname} ${friend.lastname}`} />
              <ListItemSecondaryAction>
                {this.friendIsSelected(friend, selectedFriends) &&
                  <IconButton onClick={() => onAdd(friend)}>
                    <FontAwesome name="plus" />
                  </IconButton>}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      : <List><ListItem>You don't have any friends...yet</ListItem></List>;
  }

  render() {
    const { onAdd, friends, selectedFriends } = this.props;
    return (
      <Grid container>
        <Grid item>
          <Typography type="subheading">
            Please select friends who participed in this expense
          </Typography>
          <FormControl>
            <InputLabel htmlFor="friend-name-filter">
              Search friend by name
            </InputLabel>
            <Input
              id="friend-name-filter"
              defaultValue={this.state.friendNameFilter}
              onChange={this.handleNameFilter.bind(this)}
            />
          </FormControl>
          {this.renderFriends(onAdd, friends, selectedFriends)}
        </Grid>
      </Grid>
    );
  }
}

FriendSelection.propTypes = {
  onAdd: React.PropTypes.func,
  friends: React.PropTypes.array,
  selectedFriends: React.PropTypes.array,
};

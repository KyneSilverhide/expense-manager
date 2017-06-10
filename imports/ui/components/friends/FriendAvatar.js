/* eslint-disable no-confusing-arrow */

import React from 'react';
import Avatar from 'material-ui/Avatar';

const FriendAvatar = ({ friend }) =>
  friend.gavatar
    ? <Avatar
        className="friend-avatar"
        title={`${friend.firstname} ${friend.lastname}`}
        alt={`${friend.firstname} ${friend.lastname}`}
        src={friend.gavatar}
      />
    : <Avatar
        className="friend-avatar"
        alt={`${friend.firstname} ${friend.lastname}`}
        title={`${friend.firstname} ${friend.lastname}`}
      >
        {`${friend.firstname.charAt(0)} ${friend.lastname.charAt(0)}`}
      </Avatar>;

FriendAvatar.propTypes = {
  friend: React.PropTypes.object,
};

export default FriendAvatar;

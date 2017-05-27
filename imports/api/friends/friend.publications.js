import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Friends from './friend.model';

Meteor.publish('my.friends.list', function publishAllMyFriends() {
  if (this.userId) {
    return Friends.find({
      ownerId: this.userId,
    });
  }
  return this.ready();
});

Meteor.publish('friends.view', (_id) => {
  check(_id, String);
  return Friends.find(_id);
});

Meteor.publish('friends.me', function publishUserAsFriend() {
  if (this.userId) {
    return Friends.find({
      userId: this.userId,
      ownerId: this.userId,
    });
  }
  return this.ready();
});

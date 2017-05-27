import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Friends from './friend.model.js';
import rateLimit from '../../modules/rate-limit.js';

export const upsertFriend = new ValidatedMethod({
  name: 'friends.upsert',
  validate: new SimpleSchema({
    _id: {
      type: String,
      optional: true,
    },
    firstname: {
      type: String,
      optional: false,
    },
    lastname: {
      type: String,
      optional: false,
    },
    email: {
      type: String,
      optional: false,
    },
    ownerId: {
      type: String,
      optional: false,
    },
  }).validator(),
  run(friend) {
    return Friends.upsert({ _id: friend._id }, { $set: friend });
  },
});

export const createUserAsFriend = new ValidatedMethod({
  name: 'friends.createuser',
  validate: new SimpleSchema({
    email: { type: String, optional: false },
    googleAvatar: { type: String, optional: false },
    firstname: { type: String, optional: false },
    lastname: { type: String, optional: false },
  }).validator(),
  run(googleData) {
    const userAsFriend = Friends.findOne({
      userId: this.userId,
      ownerId: this.userId,
    });
    if (userAsFriend == null) {
      const user = {
        firstname: googleData.firstname,
        lastname: googleData.lastname,
        email: googleData.email,
        ownerId: this.userId,
      };
      return Friends.insert(user);
    }
    return null;
  },
});

export const linkConnectedUserToFriendsWithSameEmail = new ValidatedMethod({
  name: 'friends.linkusertofriends',
  validate: new SimpleSchema({
    email: { type: String, optional: false },
    googleAvatar: { type: String, optional: false },
    firstname: { type: String, optional: false },
    lastname: { type: String, optional: false },
  }).validator(),
  run(googleData) {
    return Friends.update(
      { email: googleData.email },
      { $set: { userId: Meteor.userId(), gavatar: googleData.googleAvatar } },
      { multi: true },
    );
  },
});

export const linkCreatedFriendToExistingUser = new ValidatedMethod({
  name: 'friends.linkfriendtouser',
  validate: new SimpleSchema({
    friendId: { type: String, optional: false },
    userId: { type: String, optional: false },
    googleAvatar: { type: String, optional: false },
  }).validator(),
  run(data) {
    return Friends.update(
      { _id: data.friendId },
      { $set: { userId: data.userId, gavatar: data.googleAvatar } },
    );
  },
});

export const removeFriend = new ValidatedMethod({
  name: 'friends.remove',
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
  }).validator(),
  run({ _id }) {
    Friends.remove(_id);
  },
});

rateLimit({
  methods: [upsertFriend, removeFriend],
  limit: 5,
  timeRange: 1000,
});

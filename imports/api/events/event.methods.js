import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Email } from 'meteor/email';
import moment from 'moment';
import Events from './event.model.js';
import Friends from '../friends/friend.model.js';
import rateLimit from '../../modules/rate-limit.js';
import { isFriendMailInList } from '../../modules/debt-utils';

const eventSimpleSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
    optional: false,
  },
  date: {
    type: Date,
    optional: false,
  },
  completed: {
    type: Boolean,
    optional: false,
  },
  ownerId: {
    type: String,
    optional: false,
  },
  owner: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  'expenses.$._id': { type: String, optional: true },
  'expenses.$.name': { type: String, optional: false },
  'expenses.$.amount': { type: Number, optional: false },
  'expenses.$.friends': { type: Array, optional: false },
  'expenses.$.friends.$': { type: Object, optional: false },
  'expenses.$.friends.$._id': { type: String, optional: false },
  'expenses.$.friends.$.firstname': { type: String, optional: false },
  'expenses.$.friends.$.lastname': { type: String, optional: false },
  'expenses.$.friends.$.email': { type: String, optional: false },
  'expenses.$.friends.$.ownerId': { type: String, optional: false },
  'expenses.$.friends.$.userId': { type: String, optional: true },
  'expenses.$.friends.$.gavatar': { type: String, optional: true },
  'expenses.$.friends.$.paidExpense': { type: Boolean, optional: true },
});

export const upsertEvent = new ValidatedMethod({
  name: 'events.upsert',
  validate: eventSimpleSchema.validator(),
  run(event) {
    const eventUpdate = event;
    const ownerAsFriend = Friends.findOne({
      userId: this.userId,
      ownerId: this.userId,
    });
    eventUpdate.owner = ownerAsFriend;
    return Events.upsert({ _id: eventUpdate._id }, { $set: eventUpdate });
  },
});

const findFriendsInEvent = (event) => {
  const friends = [];
  for (const expense of event.expenses) {
    for (const friend of expense.friends) {
      if (friend.userId !== event.ownerId && !isFriendMailInList(friends, friend)) {
        friends.push(friend);
      }
    }
  }
  return friends;
};

const buildMailContent = event => 'This is a test <b>Bold</b>';

export const mailFriendsWithExpenses = new ValidatedMethod({
  name: 'events.email.friends',
  validate: eventSimpleSchema.validator(),
  run(event) {
    if (Meteor.isServer) {
      const friends = findFriendsInEvent(event);
      for (const friend of friends) {
        // Send one mail by friend
        // Put only expenses with friend
        const to = friend.email;
        const cc = event.owner.email;
        const from = 'Expense manager';
        const subject = `${event.name} (${moment(event.date).format('DD/MM/YYYY')})`;
        const html = buildMailContent(event);
        console.log('MAIL', to, cc, from, subject, html);
      }
      // Email.send({ to, cc, from, subject, html });
    }
  },
});

export const markCompleted = new ValidatedMethod({
  name: 'event.mark.completed',
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
  }).validator(),
  run({ _id }) {
    return Events.update({ _id }, { $set: { completed: true } });
  },
});

export const removeEvent = new ValidatedMethod({
  name: 'events.remove',
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
  }).validator(),
  run({ _id }) {
    Events.remove(_id);
  },
});

rateLimit({
  methods: [upsertEvent, removeEvent],
  limit: 5,
  timeRange: 1000,
});

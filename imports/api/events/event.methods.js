import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Events from './event.model.js';
import Friends from '../friends/friend.model.js';
import rateLimit from '../../modules/rate-limit.js';

export const upsertEvent = new ValidatedMethod({
  name: 'events.upsert',
  validate: new SimpleSchema({
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
  }).validator(),
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

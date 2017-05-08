import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Events = new Mongo.Collection('Events');
export default Events;

Events.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Events.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Events.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name of the event',
  },
  date: {
    type: Date,
    label: 'Date of the event',
  },
  completed: {
    type: Boolean,
    label: 'Event has been paid',
  },
  ownerId: {
    type: String,
    label: 'User who created the event',
  },
  'expenses.$.name': { type: String, label: 'Name of the expense' },
  'expenses.$.amount': { type: Number, label: 'Amount of the expense' },
  // 'expenses.$.friends': { type: Array, label: 'Friends in this expense' },
});

Events.attachSchema(Events.schema);

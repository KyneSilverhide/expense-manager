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
  name: { type: String, label: 'Name of the event' },
  date: { type: Date, label: 'Date of the event' },
  completed: { type: Boolean, label: 'Event has been paid' },
  ownerId: { type: String, label: 'User who created the event' },
  owner: { type: Object, label: 'User who created the event' },
  'owner._id': { type: String, label: 'Unique id of this owner' },
  'owner.firstname': { type: String, label: 'First name of this owner' },
  'owner.lastname': { type: String, label: 'Last name of this owner' },
  'owner.email': { type: String, label: 'Email of this owner' },
  'owner.ownerId': { type: String, label: 'User who added this owner' },
  'owner.gavatar': { type: String, label: 'Google avatar of the owner' },
  'owner.userId': { type: String, label: 'Link to the owner account' },
  'expenses.$.name': { type: String, label: 'Name of the expense' },
  'expenses.$.amount': { type: Number, label: 'Amount of the expense' },
  'expenses.$.friends': { type: Array, label: 'List of friends in this expense' },
  'expenses.$.friends.$': { type: Object, label: 'Friend item' },
  'expenses.$.friends.$._id': { type: String, label: 'Unique id of this friend' },
  'expenses.$.friends.$.firstname': { type: String, label: 'First name of this friend' },
  'expenses.$.friends.$.lastname': { type: String, label: 'Last name of this friend' },
  'expenses.$.friends.$.email': { type: String, label: 'Email of this friend' },
  'expenses.$.friends.$.ownerId': { type: String, label: 'User who added this friend' },
  'expenses.$.friends.$.userId': {
    type: String,
    label: 'Link to the user account with the same mail (if found)',
    optional: true,
  },
  'expenses.$.friends.$.gavatar': {
    type: String,
    label: 'Google avatar when this friend is linked to an account',
    optional: true,
  },
});

Events.attachSchema(Events.schema);

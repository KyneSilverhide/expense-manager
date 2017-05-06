import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Friends = new Mongo.Collection('Friends');
export default Friends;

Friends.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Friends.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Friends.schema = new SimpleSchema({
  firstname: {
    type: String,
    label: 'Firstname',
  },
  lastname: {
    type: String,
    label: 'Lastname',
  },
  email: {
    type: String,
    label: 'email',
  },
  ownerId: {
    type: String,
    label: 'Id of the user who created this friend',
  },
  userId: {
    type: String,
    label: 'Id of the connected user matching this friend',
    optional: true,
  },
  gavatar: {
    type: String,
    label: 'Google avatar URL',
    optional: true,
  },
});

Friends.attachSchema(Friends.schema);

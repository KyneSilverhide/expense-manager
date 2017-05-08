import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Events from './event.model';

Meteor.publish('my.events.list', function publishAllMyEvents() {
  if (this.userId) {
    return Events.find({
      ownerId: this.userId,
    });
  }
  return this.ready();
});

Meteor.publish('events.view', (_id) => {
  check(_id, String);
  return Events.find(_id);
});

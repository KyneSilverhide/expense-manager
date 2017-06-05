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

Meteor.publish('my.events.list.ongoing', function publishAllMyOngoingEvents() {
  if (this.userId) {
    const user = Meteor.users.findOne(this.userId);
    return Events.find({
      $and: [
        { completed: false },
        {
          $or: [
            { ownerId: this.userId },
            {
              expenses: {
                $elemMatch: { friends: { $elemMatch: { email: user.services.google.email } } },
              },
            },
          ],
        },
      ],
    });
  }
  return this.ready();
});

Meteor.publish('events.view', (_id) => {
  check(_id, String);
  return Events.find(_id);
});

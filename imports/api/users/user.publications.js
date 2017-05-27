import { Meteor } from 'meteor/meteor';

Meteor.publish('users.list', function publishUser() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: {
          'services.google.picture': 1,
          'services.google.email': 1,
          'services.google.given_name': 1,
          'services.google.family_name': 1,
          profile: 1,
        },
      },
    );
  }
  return this.ready();
});

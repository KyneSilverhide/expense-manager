import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        clientId: Meteor.settings.private.oAuth.google.clientId,
        loginStyle: 'popup',
        secret: Meteor.settings.private.oAuth.google.secret,
      },
    }
  );
});

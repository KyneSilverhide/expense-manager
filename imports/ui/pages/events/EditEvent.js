import React from 'react';
import Layout from 'material-ui/Layout';
import EventEditor from '../../components/events/EventEditor.js';

const EditEvent = ({ event }) => (
  <Layout container align="center" justify="center" className="NewEvent">
    <Layout item xs={6}>
      <EventEditor event={event} />
    </Layout>
  </Layout>
);

EditEvent.propTypes = {
  event: React.PropTypes.object,
};

export default EditEvent;

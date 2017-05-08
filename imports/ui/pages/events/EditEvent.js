import React from 'react';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import EventEditor from '../../components/events/EventEditor.js';

const EditEvent = ({ event }) => (
  <Layout container align="center" justify="center" className="NewEvent">
    <Layout item xs={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          Editing : {`${event.name}`}
        </Typography>
        <EventEditor event={event} />
      </Paper>
    </Layout>
  </Layout>
);

EditEvent.propTypes = {
  event: React.PropTypes.object,
};

export default EditEvent;

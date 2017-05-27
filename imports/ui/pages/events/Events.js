import React from 'react';
import { Link } from 'react-router';
import Layout from 'material-ui/Layout';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EventsList from '../../containers/events/EventsList.js';

const Events = ({ readOnly }) => (
  <Layout container direction="row" className="EventList">
    <Layout item xs={readOnly ? 12 : 11}>
      <EventsList readOnly={readOnly} />
    </Layout>
    {!readOnly &&
      <Layout item xs={1}>
        <Link to="/events/new">
          <Button fab primary>
            <AddIcon />
          </Button>
        </Link>
      </Layout>}
  </Layout>
);

Events.propTypes = {
  readOnly: React.PropTypes.bool,
};

export default Events;

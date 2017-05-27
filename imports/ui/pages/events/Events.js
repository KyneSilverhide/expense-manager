import React from 'react';
import { Link } from 'react-router';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EventsList from '../../containers/events/EventsList.js';

const Events = () => (
  <Layout container align="center" justify="center" className="Events">
    <Layout item xs={12} sm={12} md={8} lg={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          Events
        </Typography>
        <EventsList />
      </Paper>
    </Layout>
    <Link to="/events/new">
      <Button fab primary>
        <AddIcon />
      </Button>
    </Link>
  </Layout>
);

export default Events;

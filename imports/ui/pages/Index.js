import React from 'react';
import Layout from 'material-ui/Layout';
import EventsListDashboard from '../containers/events/EventsListDashboard';
import Debts from '../containers/debts/Debts';

const Index = () => (
  <Layout container direction="row">
    <Layout item xs={12} sm={9}>
      <EventsListDashboard />
    </Layout>
    <Layout item xs={12} sm={3}>
      <Debts />
    </Layout>
  </Layout>
);

export default Index;

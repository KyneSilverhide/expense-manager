import React from 'react';
import Layout from 'material-ui/Layout';
import Events from './events/Events';

const Index = () => (
  <Layout container direction="row">
    <Layout item xs={12} sm={6}>
      <Events />
    </Layout>
    <Layout item xs={12} sm={6}>
      DEBTS
    </Layout>
  </Layout>
);

export default Index;

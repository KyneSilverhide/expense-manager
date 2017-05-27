import React from 'react';
import Layout from 'material-ui/Layout';
import Events from './events/Events';

const Index = () => (
  <Layout container direction="row">
    <Layout item xs={12} sm={9}>
      <Events readOnly={true} />
    </Layout>
    <Layout item xs={12} sm={3}>
      DEBTS
    </Layout>
  </Layout>
);

export default Index;

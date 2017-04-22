import React from 'react';
import { Link } from 'react-router';
import { Layout } from 'material-ui/Layout';
import { Button } from 'material-ui/Button';
import { Text } from 'material-ui/Text';
import { Card, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';

const Events = () => (
  <Layout container justify="center" align="center">
    <Layout item>
      <Card className="event-card">
        <CardMedia>
          <img src="http://placehold.it/350x150" alt="Contemplative Reptile" />
        </CardMedia>
        <CardContent>
          <Text type="headline" component="h2">Lizard</Text>
          <Text component="p">
            Lizards are a widespread group of squamate reptiles, with over
            6,000 species, ranging across all continents except Antarctica
          </Text>
        </CardContent>
        <CardActions>
          <Button compact primary>Share</Button>
          <Button compact primary>Learn More</Button>
        </CardActions>
      </Card>
    </Layout>
    <Layout item>
      <Card className="event-card">
        <CardMedia>
          <img src="http://placehold.it/350x150" alt="Contemplative Reptile" />
        </CardMedia>
        <CardContent>
          <Text type="headline" component="h2">Lizard</Text>
          <Text component="p">
            Lizards are a widespread group of squamate reptiles, with over
            6,000 species, ranging across all continents except Antarctica
          </Text>
        </CardContent>
        <CardActions>
          <Button compact primary>Share</Button>
          <Button compact primary>Learn More</Button>
        </CardActions>
      </Card>
    </Layout>
  </Layout>
);

export default Events;

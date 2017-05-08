/* <Layout item key={event._id} xs={12}>
  <Card className="event-card">
    <CardContent>
      <Typography type="headline" component="h1">{event.name}</Typography>
      <Typography type="headline" component="h3">
        {moment(event.date).format('DD/MM/YYYY')}
      </Typography>
    </CardContent>
    <CardActions>
      <Button compact primary onClick={() => handleEdit(event._id)}>
        <FontAwesome name="pencil" />&nbsp;Edit
      </Button>
      <Button compact accent onClick={() => handleRemove(event._id)}>
        <FontAwesome name="trash" />&nbsp;Delete
      </Button>
    </CardActions>
  </Card>
</Layout> */

import { Grid, Typography } from '@mui/material';
import { EventCard } from './EventCard';

export const EventList = ({ events }) => {
  if (!events.length) {
    return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>No events found</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {events.map(event => (
        <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
};
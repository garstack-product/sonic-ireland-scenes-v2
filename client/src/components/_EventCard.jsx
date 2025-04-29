import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { CalendarToday, LocationOn, MusicNote } from '@mui/icons-material';

export const EventCard = ({ event }) => {
  const eventDate = new Date(event.date).toLocaleDateString('en-IE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={event.image_url || '/placeholder-event.jpg'}
        alt={event.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarToday sx={{ mr: 1, fontSize: '1rem' }} /> {eventDate}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ mr: 1, fontSize: '1rem' }} /> {event.venue}, {event.city}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <MusicNote sx={{ mr: 1, fontSize: '1rem' }} /> {event.genre}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={event.ticket_url} target="_blank" rel="noopener noreferrer">
          Get Tickets
        </Button>
      </CardActions>
    </Card>
  );
};
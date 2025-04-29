import React from 'react';
// pages/EventDetail/EventDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsFromDB } from '../../services/eventsService.js';
import './EventDetail.css';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const [event] = await getEventsFromDB({ id });
        setEvent(event);
      } catch (error) {
        console.error('Failed to load event:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) return <div className="loading">Loading event details...</div>;
  if (!event) return <div className="not-found">Event not found</div>;

  const eventDate = new Date(event.date).toLocaleString('en-IE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="event-detail">
      <div className="event-header">
        <h1>{event.name}</h1>
        <div className="event-meta">
          <span className="date">{eventDate}</span>
          <span className="venue">{event.venue_name}, {event.venue_city}</span>
        </div>
      </div>

      <div className="event-content">
        <div className="event-image">
          <img src={event.image_url || '/placeholder-large.jpg'} alt={event.name} />
        </div>

        <div className="event-info">
          <div className="event-description">
            <h3>About the Event</h3>
            <p>{event.description || 'No description available.'}</p>
          </div>

          <div className="event-links">
            <a href={event.ticket_url} className="btn-tickets">Get Tickets</a>
            {event.youtube_url && (
              <a href={event.youtube_url} className="btn-social">YouTube</a>
            )}
            {/* Add other social links similarly */}
          </div>

          <div className="event-map">
            <h3>Location</h3>
            {/* Map component will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
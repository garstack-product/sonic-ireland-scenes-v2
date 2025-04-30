import { format } from 'date-fns';

export default function EventCard({ event }) {
  const eventDate = new Date(event.start_date);
  
  return (
    <div className="event-card">
      <div className="event-image">
        <img 
          src={event.image_url || '/placeholder-event.jpg'} 
          alt={event.name}
          loading="lazy"
        />
      </div>
      <div className="event-details">
        <div className="event-date">
          {format(eventDate, 'EEE, MMM do')}
          <span className="event-time">{format(eventDate, 'h:mm a')}</span>
        </div>
        <h3>{event.name}</h3>
        <p className="venue">{event.venue}</p>
        <div className="event-footer">
          <span className="category">{event.classification}</span>
          <a 
            href={event.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ticket-button"
          >
            Tickets
          </a>
        </div>
      </div>
    </div>
  );
}
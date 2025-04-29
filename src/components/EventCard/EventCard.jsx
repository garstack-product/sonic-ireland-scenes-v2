// components/EventCard/EventCard.jsx
import { Link } from 'react-router-dom';
import './EventCard.css';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { HeartIcon } from '@heroicons/react/24/solid';


export default function EventCard({ event }) {
    const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const isFav = isFavorite(event.id);
  
    const toggleFavorite = () => {
      isFav ? removeFavorite(event.id) : addFavorite(event.id);
    };

  const eventDate = new Date(event.date).toLocaleDateString('en-IE', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="event-card">
        <button 
        onClick={toggleFavorite}
        className={`favorite-btn ${isFav ? 'active' : ''}`}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}>
        <HeartIcon className="heart-icon" />
      </button>
      <div className="event-image">
        <img src={event.image_url || '/placeholder.jpg'} alt={event.name} />
      </div>
      <div className="event-details">
        <h3>{event.name}</h3>
        <div className="event-meta">
          <span className="date">{eventDate}</span>
          <span className="venue">{event.venue_name}, {event.venue_city}</span>
        </div>
        <div className="event-genre">{event.genre}</div>
        <div className="event-actions">
          <Link to={`/event/${event.id}`} className="btn-details">Details</Link>
          <a href={event.ticket_url} target="_blank" rel="noopener noreferrer" className="btn-tickets">
            Tickets
          </a>
        </div>
      </div>
    </div>
  );
}
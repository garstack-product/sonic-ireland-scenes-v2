// pages/Favorites/Favorites.jsx
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import EventCard from '../../components/EventCard';
import { getEventsFromDB } from '../../services/eventsService';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length > 0) {
        const favEvents = await getEventsFromDB({ ids: favorites });
        setEvents(favEvents);
      } else {
        setEvents([]);
      }
      setLoading(false);
    };

    loadFavorites();
  }, [favorites]);

  if (loading) return <div>Loading favorites...</div>;

  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>
      {events.length > 0 ? (
        <div className="favorites-grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p>You haven't favorited any events yet</p>
      )}
    </div>
  );
}
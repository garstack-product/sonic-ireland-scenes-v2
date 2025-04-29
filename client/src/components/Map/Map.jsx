// components/Map/Map.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// components/Map/Map.jsx
import MarkerClusterGroup from 'react-leaflet-cluster';



// Fix default marker icons (Leaflet issue with Webpack)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function EventMap({ events }) {
  // Default to Dublin if no events
  const defaultPosition = [53.3498, -6.2603];

  // Get unique venues with coordinates
  const venues = events.reduce((acc, event) => {
    if (event.latitude && event.longitude && !acc.some(v => v.id === event.venue_id)) {
      acc.push({
        id: event.venue_id,
        name: event.venue_name,
        position: [event.latitude, event.longitude],
        events: events.filter(e => e.venue_id === event.venue_id)
      });
    }
    return acc;
  }, []);

  return (
    <div className="event-map">
      <MapContainer
        center={defaultPosition}
        zoom={7}
        style={{ height: '400px', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {venues.map(venue => (


            <MarkerClusterGroup>
                {venues.map(venue => (
                    <Marker key={venue.id} position={venue.position}>
                        <Popup>
                        <strong>{venue.name}</strong>
                        <div>
                            {venue.events.map(e => (
                            <div key={e.id}>
                                <a href={`/event/${e.id}`}>{e.name}</a>
                                <br />
                                {new Date(e.date).toLocaleDateString()}
                            </div>
                            ))}
                        </div>
                        </Popup>
                    </Marker>
              ))}
            </MarkerClusterGroup>
        ))}
      </MapContainer>
    </div>
  );
}
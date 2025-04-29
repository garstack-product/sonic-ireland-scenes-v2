// components/VirtualizedEventList.jsx
import { FixedSizeList as List } from 'react-window';
import EventCard from './EventCard';

export default function VirtualizedEventList({ events }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <EventCard event={events[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={events.length}
      itemSize={220} // Height of each EventCard
      width="100%"
    >
      {Row}
    </List>
  );
}
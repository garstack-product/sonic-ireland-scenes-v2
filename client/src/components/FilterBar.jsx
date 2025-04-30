export default function FilterBar({ activeFilter, setActiveFilter }) {
    const filters = [
      { id: 'all', label: 'All Events' },
      { id: 'upcoming', label: 'Upcoming' },
      { id: 'past', label: 'Past' }
    ];
  
    return (
      <div className="filter-bar">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={activeFilter === filter.id ? 'active' : ''}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    );
  }